/**
 * hiDPI-matterjs.js
 *
 * Helper for high-DPI (Retina) Matter.js rendering.
 *
 * Usage:
 *   1. Import this file in your Matter.js project.
 *   2. Use createHiDPIRender to create your renderer and get the DPR (device pixel ratio).
 *   3. Use the d() function to scale all world coordinates, body sizes, and positions by DPR (e.g., d(400)).
 *   4. Use the returned renderer as you would a normal Matter.Render object.
 *
 * Example:
 *   import { createHiDPIRender, d } from './hiDPI-matterjs.js';
 *   const { render, DPR } = createHiDPIRender({
 *     element: document.body,
 *     engine: engine,
 *     width: 800,
 *     height: 600,
 *     background: 'black',
 *     wireframes: false
 *   });
 *   // When creating bodies:
 *   const box = Bodies.rectangle(d(400), d(300), d(100), d(100));
 *   // ...
 *   Render.run(render);
 *
 * What this does:
 *   - Automatically sets up a Matter.js renderer and canvas for high-DPI screens.
 *   - Returns the DPR (device pixel ratio) for you to scale all world coordinates and sizes.
 *   - Provides a d() function to easily scale values by DPR.
 *   - Ensures your scene fills the canvas and sprites/textures are crisp on Retina/high-DPI displays.
 */

let DPR = 1;

export function createHiDPIRender({ element, engine, width, height, ...options }) {
  DPR = window.devicePixelRatio || 1;
  const CANVAS_WIDTH = width * DPR;
  const CANVAS_HEIGHT = height * DPR;

  const render = Matter.Render.create({
    element,
    engine,
    options: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      ...options
    }
  });

  // Set canvas CSS size to logical size
  render.canvas.style.width = width + 'px';
  render.canvas.style.height = height + 'px';

  return { render, DPR };
}

export function d(value) {
  return value * DPR;
} 