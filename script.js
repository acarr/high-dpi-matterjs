import { createHiDPIRender, d, resizeHiDPIRender } from './hiDPI-matterjs.js';

// Matter.js module aliases
const { Engine, World, Bodies, Render } = Matter;

// Create engine
const engine = Engine.create();

// Initial renderer setup to fill the viewport
const { render, DPR } = createHiDPIRender({
    element: document.getElementById('canvas-container'),
    engine: engine,
    width: window.innerWidth,
    height: window.innerHeight,
    background: 'black',
    wireframes: false
});

// Example: create a single object and a floor, both sized/scaled for the viewport
const imageWidth = d(216);
const imageHeight = d(270);
const imageBody = Bodies.rectangle(d(400), d(200), imageWidth, imageHeight, {
    restitution: 0.8,
    friction: 0.005,
    render: {
        sprite: {
            texture: 'image@2x.png',
            xScale: imageWidth / 432, // 2x image is 432px wide
            yScale: imageHeight / 540 // 2x image is 540px tall
        }
    }
});

const floor = Bodies.rectangle(d(window.innerWidth / 2), d(window.innerHeight - 40), d(window.innerWidth), d(40), {
    isStatic: true,
    render: {
        fillStyle: 'white'
    }
});

World.add(engine.world, [imageBody, floor]);

Engine.run(engine);
Render.run(render);

// Handle window resize: update renderer and reposition/resize bodies as needed
window.addEventListener('resize', () => {
    resizeHiDPIRender(render, window.innerWidth, window.innerHeight);
    // Optionally, reposition/resize bodies here if you want them to adapt to the new viewport
    Matter.Body.setPosition(floor, { x: d(window.innerWidth / 2), y: d(window.innerHeight - 40) });
    Matter.Body.setVertices(floor, [
        { x: d(0), y: d(window.innerHeight - 60) },
        { x: d(window.innerWidth), y: d(window.innerHeight - 60) },
        { x: d(window.innerWidth), y: d(window.innerHeight) },
        { x: d(0), y: d(window.innerHeight) }
    ]);
}); 