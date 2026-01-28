// Custom Cursor
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        if (!this.dot || !this.outline) return;

        this.mouse = { x: 0, y: 0 };
        this.dotPos = { x: 0, y: 0 };
        this.outlinePos = { x: 0, y: 0 };

        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.animate();

        document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    animate() {
        this.dotPos.x += (this.mouse.x - this.dotPos.x) * 0.3;
        this.dotPos.y += (this.mouse.y - this.dotPos.y) * 0.3;
        this.dot.style.transform = `translate(${this.dotPos.x}px, ${this.dotPos.y}px)`;

        this.outlinePos.x += (this.mouse.x - this.outlinePos.x) * 0.15;
        this.outlinePos.y += (this.mouse.y - this.outlinePos.y) * 0.15;
        this.outline.style.transform = `translate(${this.outlinePos.x}px, ${this.outlinePos.y}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Portfolio App Controller
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        document.body.classList.add('loaded');
        new CustomCursor();
        this.setupMobileMenu();
        this.setupContactForm();
        this.setupThemeToggle();

        console.log('🚀 VLSI Portfolio Ready');
    }

    setupMobileMenu() {
        const ham = document.getElementById('hamburger');
        const menu = document.getElementById('navMenu');
        if (ham && menu) {
            ham.addEventListener('click', () => {
                ham.classList.toggle('active');
                menu.classList.toggle('active');
            });
        }
    }

    setupThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', target);
            btn.querySelector('i').className = target === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Connection established! Your message has been routed to the local host.');
                form.reset();
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
