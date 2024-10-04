// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Translation Toggle
const translateBtn = document.getElementById('translate-btn');
let isTranslated = false;

// Function to toggle between English and Spanish
translateBtn.addEventListener('click', () => {
    const elements = document.querySelectorAll('[data-spanish]');
    if (!isTranslated) {
        elements.forEach(el => {
            // Store original English text if not already stored
            if (!el.dataset.original) {
                el.dataset.original = el.textContent;
            }
            // Replace English text with Spanish translation
            el.textContent = el.dataset.spanish;
        });
        translateBtn.textContent = 'Translate to English';
    } else {
        elements.forEach(el => {
            // Restore original English text
            if (el.dataset.original) {
                el.textContent = el.dataset.original;
            }
            // Note: We do NOT delete the data-original attribute here
        });
        translateBtn.textContent = 'Translate to Spanish';
    }
    isTranslated = !isTranslated;
});

// Alien Language Toggle
const alienBtn = document.getElementById('alien-btn');
let isAlien = false;

alienBtn.addEventListener('click', () => {
    const texts = document.querySelectorAll('.section p, .section ul li, .header p, footer p, #contact p, .header h1, .job h3, .section h2');
    if (!isAlien) {
        texts.forEach(text => {
            if (!text.dataset.originalTextAlien) {
                // Store original text before translating
                text.dataset.originalTextAlien = text.textContent;
                // Replace text with generated alien text
                text.textContent = generateAlienText(text.textContent.length);
                text.classList.add('alien-text');
            }
        });
        alienBtn.textContent = 'Normal Language';
    } else {
        texts.forEach(text => {
            if (text.dataset.originalTextAlien) {
                // Restore original text
                text.textContent = text.dataset.originalTextAlien;
                delete text.dataset.originalTextAlien;
                text.classList.remove('alien-text');
            }
        });
        alienBtn.textContent = 'Translate to Aliensh';
    }
    isAlien = !isAlien;
});

function generateAlienText(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+[]{}|;:,.<>?';
    let alien = '';
    for (let i = 0; i < length; i++) {
        alien += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return alien;
}

// Easter Egg: Typing 'Javier'
const easterEgg = document.getElementById('easter-egg');
let inputSequence = '';
const triggerSequence = 'javier';

window.addEventListener('keydown', (e) => {
    // Only consider alphabetical keys
    if (/^[a-zA-Z]$/.test(e.key)) {
        inputSequence += e.key.toLowerCase();
        if (inputSequence.endsWith(triggerSequence)) {
            activateEasterEgg();
            inputSequence = '';
        } else if (inputSequence.length > triggerSequence.length) {
            inputSequence = inputSequence.slice(-triggerSequence.length);
        }
    }
});

function activateEasterEgg() {
    easterEgg.classList.add('active');
    // Optionally add additional effects here
    setTimeout(() => {
        easterEgg.classList.remove('active');
    }, 5000); // Easter egg disappears after 5 seconds
}

// Enhanced Space Background with Dynamic Elements
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let comets = [];
let planets = [];
let ships = [];

const numStars = 400; // Increased number of stars
const numComets = 5;
const numPlanets = 3;
const numShips = 2;

// Resize Canvas to Fullscreen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Star Constructor
function Star(x, y, z, size, color, speed) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.color = color;
    this.speed = speed;
}

Star.prototype.update = function() {
    this.z -= this.speed;
    if (this.z <= 0) {
        this.z = canvas.width;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = getRandomStarColor();
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.3 + 0.1;
    }
}

Star.prototype.draw = function() {
    let sx = (this.x - canvas.width / 2) / this.z;
    let sy = (this.y - canvas.height / 2) / this.z;
    let r = this.size;
    let px = sx + canvas.width / 2;
    let py = sy + canvas.height / 2;

    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
}

// Comet Constructor
function Comet(x, y, velocityX, velocityY, size, tailLength, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.size = size;
    this.tailLength = tailLength;
    this.color = color;
    this.positions = [];
}

Comet.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Add current position to the trail
    this.positions.push({ x: this.x, y: this.y });

    // Limit the trail length
    if (this.positions.length > this.tailLength) {
        this.positions.shift();
    }

    // Reset comet if it goes out of bounds
    if (this.x > canvas.width + 100 || this.y > canvas.height + 100 || this.x < -100 || this.y < -100) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5; // Start from upper half
        this.velocityX = Math.random() * 2 + 1;
        this.velocityY = Math.random() * 2 + 1;
        this.size = Math.random() * 2 + 1;
        this.tailLength = Math.random() * 50 + 50;
        this.positions = [];
    }
}

Comet.prototype.draw = function() {
    // Draw the comet head
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Draw the comet tail
    if (this.positions.length > 1) {
        ctx.beginPath();
        ctx.moveTo(this.positions[0].x, this.positions[0].y);
        for (let i = 1; i < this.positions.length; i++) {
            ctx.lineTo(this.positions[i].x, this.positions[i].y);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Planet Constructor
function Planet(x, y, radius, orbitRadius, angle, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.orbitRadius = orbitRadius;
    this.angle = angle;
    this.speed = speed;
    this.color = color;
}

Planet.prototype.update = function() {
    this.angle += this.speed;
    this.x = canvas.width * 0.75 + this.orbitRadius * Math.cos(this.angle); // Shift orbit center to the right (75% of width)
    this.y = canvas.height / 2 + this.orbitRadius * Math.sin(this.angle);
}

Planet.prototype.draw = function() {
    // Draw orbit path
    ctx.beginPath();
    ctx.arc(canvas.width * 0.75, canvas.height / 2, this.orbitRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw planet
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
}

// Spaceship Constructor
function Spaceship(x, y, velocityX, velocityY, size, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.size = size;
    this.color = color;
}

Spaceship.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    // Reset spaceship if it goes out of bounds
    if (this.x > canvas.width + 100 || this.y > canvas.height + 100 || this.x < -100 || this.y < -100) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocityX = (Math.random() - 0.5) * 3;
        this.velocityY = (Math.random() - 0.5) * 3;
        this.size = Math.random() * 5 + 5;
        this.color = getRandomShipColor();
    }
}

Spaceship.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.velocityY, this.velocityX));

    // Draw spaceship as a simple triangle
    ctx.beginPath();
    ctx.moveTo(this.size, 0);
    ctx.lineTo(-this.size, this.size / 2);
    ctx.lineTo(-this.size, -this.size / 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
}

// Initialize Stars
function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let z = Math.random() * canvas.width;
        let size = Math.random() * 1.5 + 0.5;
        let color = getRandomStarColor();
        let speed = Math.random() * 0.3 + 0.1;
        stars.push(new Star(x, y, z, size, color, speed));
    }
}

// Initialize Comets
function initComets() {
    comets = [];
    for (let i = 0; i < numComets; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height * 0.5; // Start from upper half
        let velocityX = Math.random() * 2 + 1;
        let velocityY = Math.random() * 2 + 1;
        let size = Math.random() * 2 + 1;
        let tailLength = Math.random() * 50 + 50;
        let color = '#ffffff';
        comets.push(new Comet(x, y, velocityX, velocityY, size, tailLength, color));
    }
}

// Initialize Planets
function initPlanets() {
    planets = [];
    const planetColors = ['#ff6347', '#1e90ff', '#32cd32']; // Different colors for planets
    for (let i = 0; i < numPlanets; i++) {
        let orbitRadius = Math.random() * (Math.min(canvas.width, canvas.height) / 4) + 50;
        let radius = Math.random() * 20 + 10;
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 0.001 + 0.0005;
        let color = planetColors[i % planetColors.length];
        planets.push(new Planet(canvas.width * 0.75, canvas.height / 2, radius, orbitRadius, angle, speed, color));
    }
}

// Initialize Spaceships
function initShips() {
    ships = [];
    const shipColors = ['#ff00ff', '#00ffff'];
    for (let i = 0; i < numShips; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let velocityX = (Math.random() - 0.5) * 3;
        let velocityY = (Math.random() - 0.5) * 3;
        let size = Math.random() * 5 + 5;
        let color = shipColors[i % shipColors.length];
        ships.push(new Spaceship(x, y, velocityX, velocityY, size, color));
    }
}

function getRandomStarColor() {
    const colors = ['#ffffff', '#ffe700', '#ffcc00', '#00ffff', '#ff00ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomShipColor() {
    const colors = ['#ff00ff', '#00ffff', '#ff007a'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw Everything
function draw() {
    // Clear the canvas with a semi-transparent fill for motion blur
    ctx.fillStyle = 'rgba(10, 10, 30, 0.3)'; // Dark blue tint with opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Draw and update comets
    comets.forEach(comet => {
        comet.update();
        comet.draw();
    });

    // Draw and update planets
    planets.forEach(planet => {
        planet.update();
        planet.draw();
    });

    // Draw and update spaceships
    ships.forEach(ship => {
        ship.update();
        ship.draw();
    });

    requestAnimationFrame(draw);
}

// Initialize All Elements
initStars();
initComets();
initPlanets();
initShips();
draw();

// Prevent alien language buttons from translating the buttons themselves
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
