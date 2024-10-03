// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Easter Egg Reveal - Activate with a Secret Key Combo (Konami Code!)
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let keySequence = [];

window.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    keySequence.splice(-secretCode.length - 1, keySequence.length - secretCode.length);

    if (keySequence.join('') === secretCode.join('')) {
        // Trigger Easter Egg!
        const easterEgg = document.querySelector('.hidden-easter-egg');
        easterEgg.classList.add('active');
        setTimeout(() => {
            easterEgg.classList.remove('active');
        }, 5000); // Easter egg will disappear after 5 seconds
    }
});

// Random Star Generation for Background (To make it feel more alive!)
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.width = star.style.height = Math.random() * 3 + 'px';
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random twinkle duration
    document.body.appendChild(star);

    // Remove star after animation ends
    setTimeout(() => {
        star.remove();
    }, 5000);
}

// Create multiple stars
setInterval(createStar, 150);

// Cosmic Sound Effect on Section Click
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.addEventListener('click', () => {
        const cosmicSound = new Audio('cosmic-sound.mp3'); // Add your sound file here
        cosmicSound.play();
    });
});
