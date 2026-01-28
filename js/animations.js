/**
 * VLSI PORTFOLIO - PREMIUM ANIMATIONS
 * Includes: Typewriter Effect, 3D Tilt for industrial modules.
 */

class TypeWriter {
    constructor(el, phrases, speed = 80) {
        this.el = el;
        this.phrases = phrases;
        this.speed = speed;
        this.index = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const fullTxt = this.phrases[this.index];
        if (this.isDeleting) {
            this.el.textContent = fullTxt.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.el.textContent = fullTxt.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let delta = this.speed;
        if (this.isDeleting) delta /= 2;
        if (!this.isDeleting && this.charIndex === fullTxt.length) {
            delta = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.index = (this.index + 1) % this.phrases.length;
            delta = 500;
        }

        setTimeout(() => this.type(), delta);
    }
}

class TiltEffect {
    constructor(el) {
        this.el = el;
        this.el.addEventListener('mousemove', (e) => {
            const rect = this.el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = (x - xc) / xc;
            const dy = (y - yc) / yc;
            this.el.style.transform = `perspective(1000px) rotateX(${dy * -10}deg) rotateY(${dx * 10}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        this.el.addEventListener('mouseleave', () => {
            this.el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Note: Typewriter target in expanded HTML is within hero description or meta
    // We can inject it into a specific span if needed, or just run for completeness
    const twSpan = document.getElementById('typewriter');
    if (twSpan) {
        new TypeWriter(twSpan, [
            'Architecting Silicon Future',
            'Advanced RTL Validation',
            'FPGA Engineering Excellence',
            'Digital Verification Expert'
        ]);
    }

    // Initialize 3D Tilt for all premium cards
    document.querySelectorAll('.card-premium, .stat-card, .project-item').forEach(el => {
        new TiltEffect(el);
    });
});
