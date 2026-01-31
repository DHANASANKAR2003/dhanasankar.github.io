/**
 * VLSI Portfolio Core Controller
 * Handles advanced UI interactions, HUD systems, and premium animations.
 */

class TypeWriter {
    constructor(el, phrases) {
        this.el = el;
        this.phrases = phrases;
        this.phraseIdx = 0;
        this.charIdx = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const fullTxt = this.phrases[this.phraseIdx];
        this.el.textContent = this.isDeleting ? fullTxt.substring(0, this.charIdx--) : fullTxt.substring(0, this.charIdx++);

        let speed = this.isDeleting ? 40 : 80;
        if (!this.isDeleting && this.charIdx === fullTxt.length + 1) {
            speed = 2500;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIdx === 0) {
            this.isDeleting = false;
            this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
            speed = 400;
        }
        setTimeout(() => this.type(), speed);
    }
}

class PortfolioController {
    constructor() {
        this.init();
    }

    init() {
        this.setupCursor();
        this.setupNavigation();
        this.setupTypewriter();
        this.setupHUDSystem();
        this.setupScrollEffects();
        this.setupTelemetry();
        this.setupReactiveBorders();
        this.setupDataScrambling();
        this.setupFormHandling();
        this.setupVideoFallback();
        this.startSystemClock();

        console.log('🚀 VLSI Infrastructure: Stable');
    }

    setupVideoFallback() {
        const vbg = document.getElementById('vbg');
        if (vbg) {
            vbg.onerror = () => {
                console.log("Background video source not found. Using premium CSS fallback.");
                vbg.style.display = 'none';
            };
        }
    }

    setupCursor() {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        if (!dot || !outline) return;

        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            dot.style.transform = `translate(${x}px, ${y}px)`;
            outline.animate({
                transform: `translate(${x - 16}px, ${y - 16}px)`
            }, { duration: 600, fill: 'forwards', easing: 'ease-out' });
        });

        // Hover effect for interactive elements
        document.querySelectorAll('a, button, .project-card, input, textarea, .toggle-bit').forEach(el => {
            el.addEventListener('mouseenter', () => outline.style.transform += ' scale(1.5)');
            el.addEventListener('mouseleave', () => outline.style.transform = outline.style.transform.replace(' scale(1.5)', ''));
        });
    }

    setupNavigation() {
        const header = document.getElementById('header');
        const scrollBtn = document.getElementById('scrollTopBtn');
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        // Mobile Menu Toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        window.addEventListener('scroll', () => {
            // Header compression
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                scrollBtn.classList.add('active');
            } else {
                header.classList.remove('scrolled');
                scrollBtn.classList.remove('active');
            }

            // Scroll progress
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollTotal) * 100;
            document.querySelector('.scroll-progress').style.width = `${progress}%`;

            // Active section highlighting
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current)) {
                    link.classList.add("active");
                }
            });
        });

        scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setupTypewriter() {
        const tw = document.getElementById('typewriter');
        if (tw) {
            new TypeWriter(tw, [
                'Trained VLSI Engineer',
                'Design Verification Expert',
                'RTL Architecture Specialist',
                'UVM/SystemVerilog Pro',
                'FPGA System Developer'
            ]);
        }
    }

    setupHUDSystem() {
        const aiConsole = document.getElementById('aiConsole');
        const metricBar = document.querySelector('.ai-hud-panel .bar');
        const metricVal = document.querySelector('.ai-hud-panel .value');

        const consoleMsgs = [
            'System status: Nominal',
            'Synchronizing RTL modules...',
            'Voltage check complete: 1.2V stable',
            'Verification coverage target: 100%',
            'Scanning for timing violations...',
            'CDC boundary check: Zero errors',
            'Power dissipation optimized',
            'SoC interface handshake successful'
        ];

        // Central HUD Console
        setInterval(() => {
            if (aiConsole) {
                const line = document.createElement('div');
                line.textContent = `> ${consoleMsgs[Math.floor(Math.random() * consoleMsgs.length)]}`;
                aiConsole.appendChild(line);
                aiConsole.scrollTop = aiConsole.scrollHeight;
                if (aiConsole.children.length > 8) aiConsole.removeChild(aiConsole.firstChild);
            }

            // Sync random fluctuation
            const randomLoad = (70 + Math.random() * 15).toFixed(1);
            if (metricBar) metricBar.style.width = `${randomLoad}%`;
            if (metricVal) metricVal.textContent = `${randomLoad}%`;

        }, 3000);
    }

    setupScrollEffects() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    setupTelemetry() {
        const telScroll = document.getElementById('telScroll');
        const telModule = document.getElementById('telModule');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            // Scroll percentage
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.round((window.scrollY / scrollTotal) * 100);
            if (telScroll) telScroll.textContent = `${progress.toString().padStart(3, '0')}%`;

            // Section tracking
            let current = "HOME";
            sections.forEach(section => {
                if (window.scrollY >= section.offsetTop - 300) {
                    current = section.getAttribute('id').toUpperCase();
                }
            });
            if (telModule) telModule.textContent = current;
        });
    }

    setupReactiveBorders() {
        const cards = document.querySelectorAll('.project-card, .technical-card');
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const distance = Math.hypot(
                    clientX - (rect.left + rect.width / 2),
                    clientY - (rect.top + rect.height / 2)
                );
                if (distance < 300) {
                    card.classList.add('near-mouse');
                } else {
                    card.classList.remove('near-mouse');
                }
            });
        });
    }

    setupDataScrambling() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/-_=+';
        document.querySelectorAll('.highlight, .section-title').forEach(el => {
            el.addEventListener('mouseenter', () => {
                const originalText = el.getAttribute('data-text') || el.innerText;
                el.setAttribute('data-text', originalText);
                let iteration = 0;
                const interval = setInterval(() => {
                    el.innerText = originalText.split('')
                        .map((letter, index) => {
                            if (index < iteration) return originalText[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');
                    if (iteration >= originalText.length) clearInterval(interval);
                    iteration += 1 / 3;
                }, 30);
            });
        });
    }

    startSystemClock() {
        const clockEl = document.getElementById('systemClock');
        const hudClock = document.getElementById('hudClock');
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
            if (clockEl) clockEl.textContent = timeStr;
            if (hudClock) hudClock.textContent = timeStr;
        }, 1000);
    }

    setupFormHandling() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const btn = form.querySelector('button');
                const originalText = btn.innerHTML;

                btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> TRANSMITTING...';
                btn.classList.add('active');

                setTimeout(() => {
                    alert('Data transmission complete. Communication channel established.');
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.classList.remove('active');
                }, 1500);
            };
        }
    }
}

// Initializing Core
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioController();
});
