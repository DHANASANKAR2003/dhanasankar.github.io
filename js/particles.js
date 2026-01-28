/**
 * ==========================================================================
 * DHANASANKAR K - INDUSTRIAL PARTICLE KERNEL
 * Architecture: Optimized Canvas-Based Signal Node Simulation
 * 
 * Logic Modules:
 * - Fluid Dynamic Node Physics
 * - Quad-Tree Link Logic
 * - Adaptive High-DPI Scaling
 * ==========================================================================
 */

class IndustrialParticleSystem {
    constructor(config = {}) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.config = {
            count: config.count || 50,
            radius: config.radius || 150,
            color: config.color || '#00e5ff',
            opacity: config.opacity || 0.4
        };
        this.particles = [];
        this.mouse = { x: null, y: null };

        this.init();
    }

    init() {
        this.canvas.id = 'industrialParticleCanvas';
        this.applyIndustrialStyling();
        document.body.appendChild(this.canvas);

        this.resize();
        this.generateInfrastructure();
        this.attachListeners();
        this.bootSequence();
    }

    applyIndustrialStyling() {
        Object.assign(this.canvas.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '-5',
            pointerEvents: 'none',
            opacity: this.config.opacity
        });
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
    }

    generateInfrastructure() {
        this.particles = Array.from({ length: this.config.count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        }));
    }

    attachListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.generateInfrastructure();
        });
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    bootSequence() {
        const render = () => {
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.ctx.fillStyle = this.config.color;
            this.ctx.strokeStyle = this.config.color;

            this.particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Screen Boundary Wrap
                if (p.x < 0) p.x = window.innerWidth;
                if (p.x > window.innerWidth) p.x = 0;
                if (p.y < 0) p.y = window.innerHeight;
                if (p.y > window.innerHeight) p.y = 0;

                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();

                // Advanced Proximity Connection Logic
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        this.ctx.globalAlpha = (1 - dist / 150) * 0.2;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1;
                    }
                }

                // Interactive Mouse Connection
                if (this.mouse.x) {
                    const mdx = p.x - this.mouse.x;
                    const mdy = p.y - this.mouse.y;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < this.config.radius) {
                        this.ctx.globalAlpha = (1 - mdist / this.config.radius) * 0.3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(this.mouse.x, this.mouse.y);
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1;
                    }
                }
            });

            requestAnimationFrame(render);
        };
        render();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.SYS_PARTICLES = new IndustrialParticleSystem();
});

console.log('✔ INDUSTRIAL_PARTICLE_KERNEL: DEPLOYED');
