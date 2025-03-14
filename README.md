# Interactive Fireworks Website

A simple and fun interactive website that lets you create firework explosions by clicking and holding on the canvas.

## Features

- Click anywhere on the screen to create a firework explosion
- The longer you hold your click, the bigger and more vibrant the explosion
- Each explosion generates random colors
- Gravity affects the particles, creating a realistic falling effect
- Visual feedback shows how big the explosion will be while holding
- Works on both desktop and mobile devices (touch support)

## How to Run

1. Download all files to a local directory
2. Open the `index.html` file in a modern web browser
3. Click and hold on the screen to create fireworks!

## Technical Details

The fireworks are created using HTML5 Canvas and vanilla JavaScript. The code includes:

- Particle physics system with gravity
- Scaling effects based on click duration
- Random color generation
- Touch support for mobile devices
- Responsive design that works on any screen size

## Customization

You can modify the following constants in `script.js` to change the behavior of the fireworks:

- `GRAVITY`: Controls how fast particles fall
- `MIN_PARTICLES` and `MAX_PARTICLES`: Minimum and maximum number of particles per explosion
- `MIN_VELOCITY` and `MAX_VELOCITY`: Controls how fast particles move
- `MIN_SIZE` and `MAX_SIZE`: Controls the size of particles
- `PARTICLE_LIFE`: How long particles last before disappearing
- `MIN_HOLD_TIME` and `MAX_HOLD_TIME`: Range for click duration affecting explosion size

Enjoy creating beautiful fireworks displays! #   f i r e w o r k s  
 