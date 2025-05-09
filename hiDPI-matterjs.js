/**
 * hiDPI-matterjs.js
 *
 * Helper for high-DPI (Retina) Matter.js rendering with dynamic resizing support.
 *
 * Usage:
 *   1. Import this file in your Matter.js project.
 *   2. Use createHiDPIRender to create your renderer and get the DPR (device pixel ratio).
 *   3. Use the d() function to scale all world coordinates, body sizes, and positions by DPR (e.g., d(400)).
 *   4. Use resizeHiDPIRender to update the renderer and DPR when the canvas size changes (e.g., on window resize).
 *   5. Use the returned renderer as you would a normal Matter.Render object.
 *
 * Example:
 *   import { createHiDPIRender, d, resizeHiDPIRender } from './hiDPI-matterjs.js';
 *   const { render, DPR } = createHiDPIRender({
 *     element: document.body,
 *     engine: engine,
 *     width: window.innerWidth,
 *     height: window.innerHeight,
 *     background: 'black',
 *     wireframes: false
 *   });
 *   // When creating bodies:
 *   const box = Bodies.rectangle(d(400), d(300), d(100), d(100));
 *   // On window resize:
 *   window.addEventListener('resize', () => {
 *     resizeHiDPIRender(render, window.innerWidth, window.innerHeight);
 *   });
 *   Render.run(render);
 *
 * What this does:
 *   - Automatically sets up a Matter.js renderer and canvas for high-DPI screens.
 *   - Returns the DPR (device pixel ratio) for you to scale all world coordinates and sizes.
 *   - Provides a d() function to easily scale values by DPR.
 *   - Provides a resizeHiDPIRender() function to update the renderer/canvas/DPR on resize.
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

export function resizeHiDPIRender(render, width, height) {
  DPR = window.devicePixelRatio || 1;
  render.options.width = width * DPR;
  render.options.height = height * DPR;
  render.canvas.width = width * DPR;
  render.canvas.height = height * DPR;
  render.canvas.style.width = width + 'px';
  render.canvas.style.height = height + 'px';
}

export function d(value) {
  return value * DPR;
} 