// Neural Network Background System
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.nodeCount = 60;
        this.mouse = { x: null, y: null, radius: 200 };
        this.pulses = [];

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.resize();
        this.createNodes();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push(new Node(this.canvas));
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        // Click to generate a major neural pulse
        window.addEventListener('click', (e) => {
            this.createPulse(e.x, e.y);
        });
    }

    createPulse(x, y) {
        this.pulses.push({
            x, y,
            radius: 0,
            maxRadius: 400,
            speed: 5,
            opacity: 1
        });
    }

    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const n1 = this.nodes[i];
                const n2 = this.nodes[j];

                const dx = n1.x - n2.x;
                const dy = n1.y - n2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 180) {
                    const opacity = (1 - (distance / 180)) * 0.25;
                    this.ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;

                    // Neural paths are straight connections with slight glow
                    this.ctx.beginPath();
                    this.ctx.moveTo(n1.x, n1.y);
                    this.ctx.lineTo(n2.x, n2.y);
                    this.ctx.stroke();

                    // Occasional pulse moving along the connection
                    if (Math.random() < 0.001) {
                        this.ctx.fillStyle = `rgba(0, 242, 255, ${opacity * 2})`;
                        this.ctx.beginPath();
                        const t = (Date.now() % 2000) / 2000;
                        const px = n1.x + (n2.x - n1.x) * t;
                        const py = n1.y + (n2.y - n1.y) * t;
                        this.ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                        this.ctx.fill();
                    }
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw pulses
        this.pulses = this.pulses.filter(p => p.opacity > 0);
        this.pulses.forEach(p => {
            p.radius += p.speed;
            p.opacity -= 0.01;
            this.ctx.strokeStyle = `rgba(0, 242, 255, ${p.opacity * 0.3})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        });

        // Update and draw nodes
        this.nodes.forEach(node => {
            node.update(this.mouse);
            node.draw(this.ctx);
        });

        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }
}

class Node {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(0, 242, 255, ${Math.random() * 0.5 + 0.3})`;
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > this.canvas.width || this.x < 0) this.vx *= -1;
        if (this.y > this.canvas.height || this.y < 0) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                this.x -= (dx / distance) * force * 1.5;
                this.y -= (dy / distance) * force * 1.5;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Synaptic glow
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) new NeuralNetwork(canvas);
});
