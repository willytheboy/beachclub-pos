import React, { useRef, useState, useEffect } from 'react';
import { templates, RENDER_WIDTH, RENDER_HEIGHT } from './config';
import { loadImageFromFile, drawImageInFrame, drawText, drawBanner } from './utils';

export default function App() {
  const [images, setImages] = useState([]);
  const [template, setTemplate] = useState(1);
  const [heading, setHeading] = useState('');
  const [banner, setBanner] = useState('');
  const [saveDest, setSaveDest] = useState('local');
  const canvasRef = useRef(null);

  const handleFiles = async (files) => {
    const imgs = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      const img = await loadImageFromFile(file);
      imgs.push(img);
    }
    setImages(imgs);
  };

  useEffect(() => { renderCanvas(); }, [images, template, heading, banner]);

  const renderCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = RENDER_WIDTH;
    canvas.height = RENDER_HEIGHT;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const frames = templates[template] || [];
    for (let i = 0; i < frames.length; i++) {
      if (images[i]) await drawImageInFrame(ctx, images[i], frames[i]);
    }
    if (heading) drawText(ctx, heading);
    if (banner) drawBanner(ctx, banner);
  };

  const handleDownload = () => {
    if (saveDest === 'drive') {
      alert('Google Drive upload not implemented.');
      return;
    }
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'composition.png';
    a.click();
  };

  const onInputChange = (e) => handleFiles(e.target.files);
  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const onDragOver = (e) => e.preventDefault();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Templating App</h1>
      <div
        className="border-dashed border-2 p-4 mb-4 text-center"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <p className="mb-2">Drag & Drop images here</p>
        <input type="file" multiple accept="image/*" onChange={onInputChange} />
      </div>
      <div className="mb-4">
        <label className="mr-2">Template:</label>
        <select value={template} onChange={(e) => setTemplate(Number(e.target.value))} className="border p-1">
          <option value={1}>1 frame</option>
          <option value={2}>2 frames</option>
          <option value={3}>3 frames</option>
          <option value={4}>4 frames</option>
        </select>
      </div>
      <div className="mb-2">
        <input
          className="border p-1 w-full"
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          className="border p-1 w-full"
          type="text"
          placeholder="Banner text"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Save to:</label>
        <select value={saveDest} onChange={(e) => setSaveDest(e.target.value)} className="border p-1">
          <option value="local">Local Download</option>
          <option value="drive">Google Drive</option>
        </select>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleDownload}>Download</button>
      <div className="mt-4 border" style={{ width: '100%', aspectRatio: '9/16' }}>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
