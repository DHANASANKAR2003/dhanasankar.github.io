// Circuit Board Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 60;
        this.mouse = { x: null, y: null, radius: 200 };

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    drawConnections() {
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];

                const dx = Math.abs(p1.x - p2.x);
                const dy = Math.abs(p1.y - p2.y);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 1 - (distance / 150);
                    this.ctx.strokeStyle = `rgba(0, 207, 255, ${opacity * 0.2})`;

                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    if (i % 2 === 0) {
                        this.ctx.lineTo(p2.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                    } else {
                        this.ctx.lineTo(p1.x, p2.y);
                        this.ctx.lineTo(p2.x, p2.y);
                    }
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });

        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
        this.direction = Math.floor(Math.random() * 4);
        this.changeDirectionTimer = 0;
        this.color = `rgba(0, 207, 255, ${Math.random() * 0.5 + 0.3})`;
    }

    update(mouse) {
        this.changeDirectionTimer++;
        if (this.changeDirectionTimer > 100 && Math.random() < 0.02) {
            this.direction = Math.floor(Math.random() * 4);
            this.changeDirectionTimer = 0;
        }

        switch (this.direction) {
            case 0: this.y -= this.speed; break;
            case 1: this.x += this.speed; break;
            case 2: this.y += this.speed; break;
            case 3: this.x -= this.speed; break;
        }

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) new ParticleSystem(canvas);
});
