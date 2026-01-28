/**
 * VLSI Portfolio: Supplementary Animations Engine
 * Handles special scroll-reveal effects and PCB trace pulses.
 */

class SupplementaryAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupPCBTraces();
        this.setupNeuralPulse();
        this.setupGlitchEffect();
    }

    /**
     * Simulates electrical pulses traveling through the PCB background traces
     */
    setupPCBTraces() {
        const svg = document.querySelector('.pcb-lines svg');
        if (!svg) return;

        // Logic to randomly add 'active' class to some paths or circles to simulate current
        setInterval(() => {
            const dots = svg.querySelectorAll('circle');
            if (dots.length > 0) {
                const randomDot = dots[Math.floor(Math.random() * dots.length)];
                randomDot.style.fill = 'var(--primary)';
                randomDot.style.opacity = '0.8';
                randomDot.style.filter = 'drop-shadow(0 0 10px var(--primary))';

                setTimeout(() => {
                    randomDot.style.fill = 'rgba(0, 242, 255, 0.1)';
                    randomDot.style.opacity = '0.1';
                    randomDot.style.filter = 'none';
                }, 1000);
            }
        }, 1500);
    }

    /**
     * Occasional neural pulse effect for the background
     */
    setupNeuralPulse() {
        const hero = document.getElementById('home');
        if (!hero) return;

        setInterval(() => {
            if (Math.random() > 0.7) {
                hero.style.transition = 'box-shadow 0.2s ease';
                hero.style.boxShadow = 'inset 0 0 100px rgba(0, 242, 255, 0.05)';
                setTimeout(() => {
                    hero.style.boxShadow = 'none';
                }, 200);
            }
        }, 5000);
    }

    /**
     * Glitch logic for technical headings
     */
    setupGlitchEffect() {
        const headings = document.querySelectorAll('.hero-title');
        headings.forEach(h => {
            h.addEventListener('mouseenter', () => {
                h.style.animation = 'glitch-skew 0.3s infinite';
            });
            h.addEventListener('mouseleave', () => {
                h.style.animation = 'none';
            });
        });
    }
}

// Global Animation Add-ons
document.addEventListener('DOMContentLoaded', () => {
    new SupplementaryAnimations();
});
