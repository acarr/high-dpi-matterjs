# Matter.js High-DPI Demo

This project demonstrates how to use Matter.js with crisp, high-DPI (Retina) rendering for sprites and physics bodies. It includes a modular helper for easy integration into any Matter.js project.

## Features
- High-DPI (Retina) support for Matter.js canvas rendering
- Modular helper (`hiDPI-matterjs.js`) for easy reuse
- Example with 1x and 2x images for visual comparison
- Clean, modern HTML/CSS/JS (no frameworks)

## Usage

### 1. High-DPI Helper
Use the `hiDPI-matterjs.js` module to set up your renderer and scale all world coordinates and sizes:

```js
import { createHiDPIRender, d } from './hiDPI-matterjs.js';

const { render, DPR } = createHiDPIRender({
  element: document.getElementById('canvas-container'),
  engine: engine,
  width: 800,
  height: 600,
  background: 'black',
  wireframes: false
});

// Use d() for all coordinates and sizes:
const box = Bodies.rectangle(d(400), d(300), d(100), d(100));
```

### 2. Running the Demo
- Open `index.html` in a modern browser (use a local server for best results).
- The demo shows two images (1x and 2x) and two falling physics bodies using those images as textures.
- The 2x image will appear crisp on high-DPI displays.

### 3. Project Structure
- `index.html` – Main HTML file
- `styles.css` – Basic styling
- `script.js` – Main demo logic (uses the hiDPI helper)
- `hiDPI-matterjs.js` – Modular high-DPI helper
- `image.png`, `image@2x.png` – Example images

## Notes
- Make sure to serve files with a local server for ES module imports to work (e.g., `python -m http.server`).
- The `.gitignore` file ignores image assets and common build artifacts.

## License
MIT 