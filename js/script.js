/**
 * ==========================================================================
 * DHANASANKAR K - PROFESSIONAL SYSTEM ORCHESTRATOR
 * Architecture: Event-Driven Industrial Interface Controller
 * 
 * Logic Modules:
 * - Adaptive Navigation Tracking
 * - Smooth-Scroll Interception
 * - Custom Industrial Cursor Physics
 * - System Signal Confirmation (Forms)
 * ==========================================================================
 */

class IndustrialOrchestrator {
    constructor() {
        this.header = document.getElementById('header');
        this.cursor = document.querySelector('.industrial-cursor');
        this.cursorDot = document.querySelector('.industrial-cursor-dot');
        this.navLinks = document.querySelectorAll('.nav-link-industrial');

        this.init();
    }

    init() {
        this.initializeScrollHandling();
        this.initializeCursorPhysics();
        this.initializeNavigationlogic();
        this.initializeSignalTransmission();

        console.log('%c [SYSTEM_READY] Professional Portfolio Orchestrator Active ', 'background: #00e5ff; color: #03030d; font-weight: bold; border-radius: 4px; padding: 4px 8px;');
    }

    initializeScrollHandling() {
        const checkScroll = () => {
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    initializeCursorPhysics() {
        if (!this.cursor) return;

        document.addEventListener('mousemove', (e) => {
            // Main ring follows with lag
            setTimeout(() => {
                this.cursor.style.left = `${e.clientX}px`;
                this.cursor.style.top = `${e.clientY}px`;
            }, 50);

            // Dot follows immediately
            this.cursorDot.style.left = `${e.clientX}px`;
            this.cursorDot.style.top = `${e.clientY}px`;
        });

        // Hover expansions for interactive modules
        document.querySelectorAll('a, button, .glass-card-industrial, .project-industrial-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                this.cursor.style.background = 'rgba(0, 229, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.background = 'rgba(0, 229, 255, 0.05)';
            });
        });
    }

    initializeNavigationlogic() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetEl = document.querySelector(targetId);

                if (targetEl) {
                    const offset = 100;
                    const position = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initializeSignalTransmission() {
        const contactForm = document.getElementById('contact-gate');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalMarkup = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TRANSMITTING_SIGNAL...';
            submitBtn.disabled = true;

            // Simulate high-performance industrial processing delay
            setTimeout(() => {
                alert('SIGNAL_TRANSMITTED: Dhanasankar K has successfully received your data packet.');
                submitBtn.innerHTML = originalMarkup;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2500);
        });
    }
}

/**
 * [SYSTEM_BOOT]
 */
document.addEventListener('DOMContentLoaded', () => {
    window.V_SYSTEM = new IndustrialOrchestrator();
});
