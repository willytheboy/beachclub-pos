export function loadImageFromFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function drawImageInFrame(ctx, img, frame) {
  const { x, y, width, height } = frame;
  let source = img;
  if (img.width > img.height) {
    const canvas = document.createElement('canvas');
    canvas.width = img.height;
    canvas.height = img.width;
    const rCtx = canvas.getContext('2d');
    rCtx.translate(canvas.width / 2, canvas.height / 2);
    rCtx.rotate(-Math.PI / 2);
    rCtx.drawImage(img, -img.width / 2, -img.height / 2);
    source = new Image();
    source.src = canvas.toDataURL();
    await new Promise(r => (source.onload = r));
  }
  const scale = Math.max(width / source.width, height / source.height);
  const sw = source.width * scale;
  const sh = source.height * scale;
  const sx = x + (width - sw) / 2;
  const sy = y + (height - sh) / 2;
  ctx.drawImage(source, sx, sy, sw, sh);
}

export function drawText(ctx, text) {
  ctx.font = 'bold 64px sans-serif';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(text, ctx.canvas.width / 2, 100);
}

export function drawBanner(ctx, text) {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, ctx.canvas.height - 80, ctx.canvas.width, 80);
  ctx.fillStyle = 'white';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(text, 20, ctx.canvas.height - 25);
}
