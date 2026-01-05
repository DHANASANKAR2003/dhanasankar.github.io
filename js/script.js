// Custom Cursor
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        this.bounds = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };

        if (this.dot && this.outline) {
            this.init();
        }
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
        });

        this.animate();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    animate() {
        this.bounds.x += (this.mouse.x - this.bounds.x) * 0.2;
        this.bounds.y += (this.mouse.y - this.bounds.y) * 0.2;
        this.outline.style.transform = `translate(${this.bounds.x}px, ${this.bounds.y}px)`;
        requestAnimationFrame(() => this.animate());
    }
}

// Magnetic Button Effect
class MagneticButton {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translate(0, 0)';
        });
    }
}

// Main Script
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Removed runSimulationBoot() for instant load
        document.body.classList.add('loaded');

        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupScrollToTop();
        this.setupContactForm();

        new CustomCursor();
        document.querySelectorAll('.btn, .social-icon').forEach(btn => {
            new MagneticButton(btn);
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    setupScrollToTop() {
        const btn = document.getElementById('scrollToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.pageYOffset > 300);
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Functional Contact Form logic would go here. Message received!');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    console.log('🚀 Portfolio Ready');
});
