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
        const miniLog = document.getElementById('miniLog');
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

        const miniMsgs = [
            'COV: 89.2%', 'PASS', 'SEQ_BUSY', 'DRV_STBL', 'MON_ACTV'
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

        // Sidebar Mini-Log
        setInterval(() => {
            if (miniLog) {
                miniLog.textContent = `> ${miniMsgs[Math.floor(Math.random() * miniMsgs.length)]}\n> ${miniMsgs[Math.floor(Math.random() * miniMsgs.length)]}`;

                // Animate bars in left HUD
                document.querySelectorAll('.graph-bar').forEach(bar => {
                    bar.style.height = (Math.random() * 80 + 20) + '%';
                });
            }
        }, 2000);
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

    startSystemClock() {
        const clockEl = document.getElementById('systemClock');
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
            if (clockEl) clockEl.textContent = timeStr;
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
