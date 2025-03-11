// Canvas setup
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas size
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Track mouse state and position
let isMouseDown = false;
let clickStartTime = 0;
let mouseX = 0;
let mouseY = 0;
let particles = [];

// Constants for firework behavior
const GRAVITY = 0.1;
const MIN_PARTICLES = 50;
const MAX_PARTICLES = 200;
const MIN_VELOCITY = 2;
const MAX_VELOCITY = 5;
const MIN_SIZE = 2;
const MAX_SIZE = 4;
const PARTICLE_LIFE = 100;
const MIN_HOLD_TIME = 100; // milliseconds
const MAX_HOLD_TIME = 2000; // milliseconds for max size

// Class to represent a single particle in the firework
class Particle {
    constructor(x, y, color, size, velocity, gravity) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.color = color;
        this.size = size;
        this.velocity = velocity;
        this.gravity = gravity;
        this.life = PARTICLE_LIFE;
        this.alpha = 1;
    }

    update() {
        // Apply velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Apply gravity
        this.velocity.y += this.gravity;
        
        // Decrease life
        this.life--;
        
        // Fade out
        this.alpha = this.life / PARTICLE_LIFE;
        
        return this.life > 0;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Generate a random color
function getRandomColor() {
    const colors = [
        '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
        '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
        '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
        '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create firework explosion
function createFirework(x, y, holdTime) {
    // Calculate scale factor based on hold time
    const holdTimeRatio = Math.min(1, (holdTime - MIN_HOLD_TIME) / (MAX_HOLD_TIME - MIN_HOLD_TIME));
    const particleCount = Math.floor(MIN_PARTICLES + holdTimeRatio * (MAX_PARTICLES - MIN_PARTICLES));
    
    // Generate multiple colors for this explosion
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    const colors = [color1, color2, color3];
    
    // Create particles in a circular explosion
    for (let i = 0; i < particleCount; i++) {
        // Random angle and velocity
        const angle = Math.random() * Math.PI * 2;
        const velocityMagnitude = MIN_VELOCITY + Math.random() * (MAX_VELOCITY - MIN_VELOCITY) * (1 + holdTimeRatio);
        
        // Create particle
        const particle = new Particle(
            x,
            y,
            colors[Math.floor(Math.random() * colors.length)],
            MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE) * (1 + holdTimeRatio),
            {
                x: Math.cos(angle) * velocityMagnitude,
                y: Math.sin(angle) * velocityMagnitude
            },
            GRAVITY
        );
        
        particles.push(particle);
    }
}

// Handle mouse events
canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    clickStartTime = Date.now();
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('mouseup', (e) => {
    if (isMouseDown) {
        const holdTime = Date.now() - clickStartTime;
        if (holdTime >= MIN_HOLD_TIME) {
            createFirework(mouseX, mouseY, holdTime);
        }
        isMouseDown = false;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});

// Touch support for mobile devices
canvas.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    clickStartTime = Date.now();
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
    e.preventDefault();
});

canvas.addEventListener('touchend', (e) => {
    if (isMouseDown) {
        const holdTime = Date.now() - clickStartTime;
        if (holdTime >= MIN_HOLD_TIME) {
            createFirework(mouseX, mouseY, holdTime);
        }
        isMouseDown = false;
    }
    e.preventDefault();
});

canvas.addEventListener('touchmove', (e) => {
    if (isMouseDown) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }
    e.preventDefault();
});

// Animation loop
function animate() {
    // Create semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles = particles.filter(particle => {
        const isAlive = particle.update();
        if (isAlive) {
            particle.draw();
        }
        return isAlive;
    });
    
    // Visual feedback for click and hold
    if (isMouseDown) {
        const holdTime = Date.now() - clickStartTime;
        if (holdTime >= MIN_HOLD_TIME) {
            const radius = 10 + (holdTime - MIN_HOLD_TIME) / 100;
            const opacity = Math.min(0.7, holdTime / 1000);
            
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
            
            // Add small particles while holding
            if (Math.random() > 0.7) {
                const angle = Math.random() * Math.PI * 2;
                const dist = radius * 0.8;
                
                particles.push(new Particle(
                    mouseX + Math.cos(angle) * dist,
                    mouseY + Math.sin(angle) * dist,
                    getRandomColor(),
                    1 + Math.random() * 2,
                    {
                        x: Math.cos(angle) * 0.5,
                        y: Math.sin(angle) * 0.5
                    },
                    GRAVITY * 0.5
                ));
            }
        }
    }
    
    requestAnimationFrame(animate);
}

// Start animation
animate(); 