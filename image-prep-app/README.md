# Image Prep Web App

This folder contains a small React application for composing images in a 9:16 portrait layout. It lets you drag and drop images, select from multi-frame templates, add a heading, and overlay a banner at the bottom. The result can be downloaded as a single PNG file.

## Running

This project expects a typical React + Tailwind setup (for example using [Vite](https://vitejs.dev)).

```
cd image-prep-app
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

The **Google Drive** option in the UI is not implemented—it falls back to a local download.
