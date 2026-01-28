/**
 * VLSI PORTFOLIO - CORE ORCHESTRATOR
 * Version: 4.0.0-Stable
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    // Sticky Header Evolution
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 90;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Contact Form Signal Transmission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TRANSMITTING_DATA...';
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('SIGNAL_RECEIVED: Dhanasankar K will respond to your transmission shortly.');
                btn.innerHTML = originalText;
                btn.style.pointerEvents = 'auto';
                btn.style.opacity = '1';
                contactForm.reset();
            }, 2000);
        });
    }

    // Scroll Indicator Logic
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // Terminal Button Easter Egg
    const termBtn = document.querySelector('.nav-controls .btn');
    if (termBtn) {
        termBtn.addEventListener('click', () => {
            console.log("%c TERMINAL_INIT: Kernel versionArtix7 v4.0.1 ", "color: #00ff00; background: #000; font-family: monospace;");
            console.log("%c >> Initializing Vivado environment... ", "color: #00ff00;");
            console.log("%c >> Loading Dhanasankar RTL cores... DONE ", "color: #00ff00;");
            alert('SYSTEM_STATUS: OK\nCORES_LOADED: 50+\nVERIFICATION_READY: UVM_ACTIVE');
        });
    }
});

// Final System Report
console.log('🚀 DHANASANKAR_VLSI_PORTFOLIO ORCHESTRATOR: ONLINE');
