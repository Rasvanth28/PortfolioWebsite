/**
 * Portfolio Interactive Scripts
 * Aesthetic: Cicada 3301 / Deep Space
 * Features: Butterfly Particle System, Typewriter, Hidden Console
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initButterflySystem();
    initConsole();
    initNavigation();
});

/* --- Typewriter Effect --- */
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    const role = "ML Research Engineer // Security Enthusiast";
    let index = 0;

    function type() {
        if (index < role.length) {
            textElement.textContent += role.charAt(index);
            index++;
            setTimeout(type, Math.random() * 100 + 50);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* --- Butterfly Particle System --- */
function initButterflySystem() {
    const canvas = document.getElementById('butterfly-canvas');
    const ctx = canvas.getContext('2d');
    
    let butterflies = [];
    const count = 15;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Butterfly {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 3 + 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = -(Math.random() * 1 + 0.5);
            this.amplitude = Math.random() * 50 + 20;
            this.angle = Math.random() * Math.PI * 2;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = '#9d4edd'; // Deep Violet
            this.wingPulse = 0;
        }

        update() {
            this.y += this.speedY;
            this.angle += 0.02;
            this.x += Math.sin(this.angle) * 1.5 + this.speedX;
            this.wingPulse += 0.1;

            if (this.y < -50) {
                this.init();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.globalAlpha = this.opacity;
            
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;

            // Draw wings (simplified triangle approach for ethereal look)
            const wingWidth = Math.abs(Math.sin(this.wingPulse)) * this.size * 3;
            
            // Left Wing
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-wingWidth, -this.size * 2, -wingWidth/2, this.size);
            ctx.fill();

            // Right Wing
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(wingWidth, -this.size * 2, wingWidth/2, this.size);
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < count; i++) {
        butterflies.push(new Butterfly());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        butterflies.forEach(b => {
            b.update();
            b.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Interaction Easter Egg
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        butterflies.forEach(b => {
            const dist = Math.sqrt((b.x - mouseX)**2 + (b.y - mouseY)**2);
            if (dist < 50) {
                // Trigger terminal pulse
                document.body.style.boxShadow = "inset 0 0 100px var(--neon-accent)";
                setTimeout(() => {
                    document.body.style.boxShadow = "none";
                }, 200);
                
                console.log("%c [BUTTERFLY_DETECTOR]: Signal Detected. Try 'reveal' in console.", "color: #9d4edd; font-weight: bold;");
            }
        });
    });
}

/* --- Console Logic --- */
function initConsole() {
    const input = document.getElementById('console-input');
    const overlay = document.getElementById('rickroll-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const playerDiv = document.getElementById('player');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            input.value = '';

            processCommand(cmd);
        }
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        playerDiv.innerHTML = ''; // Stop video
    });

    function processCommand(cmd) {
        switch(cmd) {
            case 'help':
                alert("AVAILABLE_COMMANDS: whois, skills, projects, clear, reveal");
                break;
            case 'whois':
                alert("IDENTITY: K.C. Rasvanth | ROLE: ML Research Engineer");
                break;
            case 'reveal':
                triggerRickroll();
                break;
            case 'clear':
                console.clear();
                break;
            default:
                console.log(`Command not found: ${cmd}`);
        }
    }

    function triggerRickroll() {
        overlay.classList.remove('hidden');
        playerDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }
}

/* --- Smooth Scrolling --- */
function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#main-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}
