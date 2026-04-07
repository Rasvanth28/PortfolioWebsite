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
    const role = "Machine Learning Research Engineer";
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
    let particles = [];
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
            this.size = Math.random() * 10 + 5; // Increased size
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
            ctx.quadraticCurveTo(-wingWidth, -this.size * 2, -wingWidth / 2, this.size);
            ctx.fill();

            // Right Wing
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(wingWidth, -this.size * 2, wingWidth / 2, this.size);
            ctx.fill();

            ctx.restore();
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 8;
            this.speedY = (Math.random() - 0.5) * 8;
            this.opacity = 1;
            this.color = color;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.update();
            p.draw();
            if (p.opacity <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Interaction: Butterfly Effect
    window.addEventListener('click', (e) => {
        // Ignore clicks on functional elements to prevent accidental triggers
        if (["INPUT", "TEXTAREA", "BUTTON", "A"].includes(e.target.tagName)) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        butterflies.forEach(b => {
            const dist = Math.sqrt((b.x - mouseX) ** 2 + (b.y - mouseY) ** 2);
            if (dist < 50) {
                // Visual Effect: Random Catalyst
                const isHyperspeed = Math.random() > 0.5;
                const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-accent').trim();

                if (isHyperspeed) {
                    b.speedY = -25;
                    b.speedX = (Math.random() - 0.5) * 15;
                    b.color = currentColor;
                } else {
                    for (let i = 0; i < 30; i++) {
                        particles.push(new Particle(b.x, b.y, currentColor));
                    }
                    b.init(); // Reset shattered butterfly
                }

                // Global Color Glitch
                const randomColor = `hsl(${Math.random() * 360}, 100%, 65%)`;
                document.documentElement.style.setProperty('--neon-accent', randomColor);

                // Resolve Anomaly
                setTimeout(() => {
                    document.documentElement.style.setProperty('--neon-accent', '#9d4edd');
                }, 5000);

                console.log("%c [BUTTERFLY_DETECTOR]: Reality manipulated. Try 'reveal' in console.", "color: #9d4edd; font-weight: bold;");
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

    let terminalState = 'normal';
    let emailData = { email: '', message: '' };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const rawInput = input.value.trim();
            input.value = '';
            if (rawInput) processCommand(rawInput);
        }
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        playerDiv.innerHTML = ''; // Stop video
    });

    function appendTerminalOutput(text, isCommand = false) {
        const history = document.getElementById('terminal-history');
        if (!history) return;

        const line = document.createElement('div');
        line.className = isCommand ? 'terminal-output-line cmd' : 'terminal-output-line';
        line.textContent = text;
        history.appendChild(line);

        // Auto-scroll the hero terminal body
        const terminalBody = history.parentElement;
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function processCommand(rawInput) {
        appendTerminalOutput(rawInput, true);

        if (rawInput.toLowerCase() === 'clear') {
            document.getElementById('terminal-history').innerHTML = '';
            console.clear();
            terminalState = 'normal';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (terminalState === 'awaiting_email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(rawInput)) {
                appendTerminalOutput("[ERROR: INVALID_EMAIL_FORMAT]");
                appendTerminalOutput("Enter Email ID:");
                return;
            }
            emailData.email = rawInput;
            appendTerminalOutput(`[Email Saved: ${emailData.email}]`);
            appendTerminalOutput("Enter Message:");
            terminalState = 'awaiting_message';
            return;
        }

        if (terminalState === 'awaiting_message') {
            emailData.message = rawInput;
            appendTerminalOutput("[Message Received. Sending...]");
            terminalState = 'sending';

            fetch("https://formspree.io/f/mzdkjbar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailData.email, message: emailData.message })
            }).then(response => {
                if (response.ok) {
                    appendTerminalOutput("Transmission Successful: Mail sent.");
                } else {
                    appendTerminalOutput("Transmission Failed: Could not send mail.");
                }
                terminalState = 'normal';
            }).catch(error => {
                appendTerminalOutput("Transmission Failed: Could not send mail.");
                terminalState = 'normal';
            });
            return;
        }

        const cmd = rawInput.toLowerCase();

        switch (cmd) {
            case 'help':
                appendTerminalOutput("AVAILABLE_COMMANDS: whois, skills, projects, contact, sendMail, clear, reveal");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'whois':
                appendTerminalOutput("IDENTITY: K.C.Rasvanth | ROLE: ML Research Engineer | STATUS: ACTIVE");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'skills':
                appendTerminalOutput("REDIRECTING_TO_DOCS: Scrolling to SKILLS_AND_DIRECTIVES section.");
                document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'sendmail':
                appendTerminalOutput("Secure Email Setup:");
                appendTerminalOutput("Enter Email ID:");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                terminalState = 'awaiting_email';
                break;
            case 'projects':
                appendTerminalOutput("REDIRECTING_TO_DOCS: Scrolling to PROJECT_LOGS section.");
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                appendTerminalOutput("REDIRECTING_TO_DOCS: Scrolling to CONTACT_INITIATE section.");
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'reveal':
                appendTerminalOutput("SECURITY_BREACH: INITIATING_OVERLAY_SEQUENCE...");
                triggerRickroll();
                break;
            default:
                appendTerminalOutput(`COMMAND_NOT_FOUND: ${cmd}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function triggerRickroll() {
        overlay.classList.remove('hidden');
        playerDiv.innerHTML = `<video src="reveal.mp4" autoplay controls style="width: 100%; height: 100%;"></video>`;
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
