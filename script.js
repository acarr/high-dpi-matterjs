import { createHiDPIRender, d } from './hiDPI-matterjs.js';

// Matter.js module aliases
const { Engine, World, Bodies, Render } = Matter;

// Create engine
const engine = Engine.create();

// Use the hiDPI helper to create the renderer and get DPR
const { render, DPR } = createHiDPIRender({
    element: document.getElementById('canvas-container'),
    engine: engine,
    width: 800,
    height: 600,
    background: 'black',
    wireframes: false
});

// All world coordinates and sizes are scaled by d()
const imageWidth = d(216);
const imageHeight = d(270);
const imageBody = Bodies.rectangle(d(320), d(150), imageWidth, imageHeight, {
    restitution: 0.8,
    friction: 0.005,
    render: {
        sprite: {
            texture: 'image.png',
            xScale: imageWidth / 216,
            yScale: imageHeight / 270
        }
    }
});

// Create a second falling object (rectangle with 2x image texture)
const image2xBody = Bodies.rectangle(d(480), d(150), imageWidth, imageHeight, {
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

// Create a floor
const floor = Bodies.rectangle(d(400), d(550), d(800), d(20), {
    isStatic: true,
    render: {
        fillStyle: 'white'
    }
});

// Add bodies to the world
World.add(engine.world, [imageBody, image2xBody, floor]);

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render); 