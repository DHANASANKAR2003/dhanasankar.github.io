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

            // Immediate update for dot
            this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
        });

        // Smooth follow for outline
        this.animate();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    animate() {
        // Lerp for smooth movement
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
        this.boundingRect = this.element.getBoundingClientRect();
        this.init();
    }

    init() {
        window.addEventListener('resize', () => {
            this.boundingRect = this.element.getBoundingClientRect();
        });

        this.element.addEventListener('mousemove', (e) => {
            const x = e.clientX - this.boundingRect.left - this.boundingRect.width / 2;
            const y = e.clientY - this.boundingRect.top - this.boundingRect.height / 2;

            this.element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translate(0, 0)';
        });
    }
}

// Main Script - Interactive Features
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupScrollToTop();
        this.setupContactForm();
        this.setupImageLazyLoading();

        // Initialize Premium Features
        new CustomCursor();

        // Initialize Magnetic Buttons
        document.querySelectorAll('.btn, .social-icon').forEach(btn => {
            new MagneticButton(btn);
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');

        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');

        if (!scrollToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');

        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual endpoint)
                await this.simulateFormSubmission(data);

                // Show success message
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                // Show error message
                this.showNotification('Failed to send message. Please try again or email directly.', 'error');
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    async simulateFormSubmission(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    `;

        // Add styles
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      z-index: 10001;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
    `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Utility Functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format date
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    },

    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }
};

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .notification {
    animation: slideInRight 0.3s ease;
  }
`;
document.head.appendChild(style);

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.collectMetrics();
                }, 0);
            });
        }
    }

    collectMetrics() {
        const perfData = performance.getEntriesByType('navigation')[0];

        if (perfData) {
            this.metrics = {
                dns: perfData.domainLookupEnd - perfData.domainLookupStart,
                tcp: perfData.connectEnd - perfData.connectStart,
                request: perfData.responseStart - perfData.requestStart,
                response: perfData.responseEnd - perfData.responseStart,
                dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                load: perfData.loadEventEnd - perfData.loadEventStart,
                total: perfData.loadEventEnd - perfData.fetchStart
            };

            console.log('Performance Metrics:', this.metrics);
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Navbar Controller
class NavbarController {
    constructor() {
        this.header = document.getElementById('header');
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.indicator = document.querySelector('.nav-indicator');
        this.links = document.querySelectorAll('.nav-link');
        this.activeLink = document.querySelector('.nav-link.active');

        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMagneticIndicator();
        this.setupMobileMenu();

        // Initial position
        if (this.activeLink) {
            setTimeout(() => this.moveIndicator(this.activeLink), 100);
        }
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }

    setupMagneticIndicator() {
        this.links.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.moveIndicator(e.target);
            });
        });

        this.navMenu.addEventListener('mouseleave', () => {
            const active = document.querySelector('.nav-link.active');
            if (active) {
                this.moveIndicator(active);
            } else {
                this.indicator.style.opacity = '0';
            }
        });

        // Update on click
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                this.links.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                this.moveIndicator(e.target);
            });
        });

        // Update on scroll spy
        window.addEventListener('scroll', utils.debounce(() => {
            const active = document.querySelector('.nav-link.active');
            if (active) this.moveIndicator(active);
        }, 100));
    }

    moveIndicator(element) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const parentRect = this.navMenu.getBoundingClientRect();

        const left = rect.left - parentRect.left;
        const width = rect.width;

        this.indicator.style.left = `${left}px`;
        this.indicator.style.width = `${width}px`;
        this.indicator.style.opacity = '1';
    }

    setupMobileMenu() {
        // Existing mobile menu logic is handled by PortfolioApp, 
        // but we can add specific enhancements here if needed
    }
}

// Text Scramble Effect for Section Titles
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new PortfolioApp();

    // Initialize Navbar Controller
    new NavbarController();

    // Initialize performance monitoring
    new PerformanceMonitor();

    // Add smooth reveal for hero section
    setTimeout(() => {
        document.querySelector('.hero-section')?.classList.add('revealed');
    }, 100);

    // Initialize Text Scramble for headings
    const headings = document.querySelectorAll('.section-title');
    headings.forEach(h => {
        // Store original text
        if (!h.dataset.originalText) {
            h.dataset.originalText = h.innerText;
        }

        const scrambler = new TextScramble(h);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !h.classList.contains('scrambled')) {
                    scrambler.setText(h.dataset.originalText);
                    h.classList.add('scrambled');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(h);
    });

    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00cfff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Designed & Developed by Dhanasankar K', 'color: #00ffe7; font-size: 12px;');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Export for use in other modules if needed
window.PortfolioApp = PortfolioApp;
window.utils = utils;
