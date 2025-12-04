class WaveformSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.signals = [];
        this.signalCount = 8;
        this.time = 0;
        this.speed = 2;
        this.scale = 20; // Pixels per time unit

        this.colors = [
            '#00ff00', // Green (Classic terminal)
            '#00cfff', // Cyan (Primary)
            '#ff0055', // Red (Error/High Z)
            '#ffe600', // Yellow (Warning/Bus)
        ];

        this.init();
    }

    init() {
        this.resize();
        this.createSignals();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.signalHeight = this.canvas.height / (this.signalCount + 2);
    }

    createSignals() {
        this.signals = [];
        // Clock signal
        this.signals.push({
            name: 'CLK',
            type: 'clock',
            period: 40,
            color: this.colors[1],
            data: []
        });

        // Reset signal
        this.signals.push({
            name: 'RST_N',
            type: 'stable',
            value: 1,
            color: this.colors[2],
            data: []
        });

        // Random data buses and control signals
        const names = ['ADDR[31:0]', 'WDATA[31:0]', 'RDATA[31:0]', 'VALID', 'READY', 'IRQ'];
        names.forEach((name, index) => {
            this.signals.push({
                name: name,
                type: name.includes('[') ? 'bus' : 'bit',
                color: this.colors[index % this.colors.length],
                data: [],
                changeProb: 0.02
            });
        });
    }

    update() {
        this.time += this.speed;

        this.signals.forEach(signal => {
            // Generate new data point if needed
            if (signal.type === 'clock') {
                const val = Math.floor(this.time / (signal.period / 2)) % 2;
                signal.data.push({ t: this.time, v: val });
            } else if (signal.type === 'stable') {
                // Occasionally toggle reset
                if (Math.random() < 0.001) {
                    signal.value = !signal.value;
                }
                signal.data.push({ t: this.time, v: signal.value ? 1 : 0 });
            } else {
                // Random changes
                if (Math.random() < signal.changeProb) {
                    signal.value = signal.type === 'bus' ? Math.floor(Math.random() * 0xFFFFFFFF) : (Math.random() > 0.5 ? 1 : 0);
                }
                // Keep previous value if no change, or new value
                // For drawing simplicity, we just push the current state
                signal.data.push({ t: this.time, v: signal.value });
            }

            // Cleanup old data
            signal.data = signal.data.filter(d => d.t > this.time - this.canvas.width - 100);
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#0f2027'; // Dark background
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Optional: if we want opaque

        this.ctx.lineWidth = 2;
        this.ctx.font = '12px "Fira Code", monospace';

        this.signals.forEach((signal, index) => {
            const yBase = (index + 1) * this.signalHeight;
            const yHigh = yBase - 15;
            const yLow = yBase + 15;

            this.ctx.strokeStyle = signal.color;
            this.ctx.fillStyle = signal.color;

            // Draw Signal Name
            this.ctx.fillText(signal.name, 20, yBase);

            this.ctx.beginPath();

            let first = true;
            signal.data.forEach(point => {
                const x = point.t - (this.time - this.canvas.width);

                if (x < 100) return; // Reserve space for labels

                if (signal.type === 'bus') {
                    // Draw bus (hex shape)
                    // Simplified: just two lines crossing if value changes, or parallel lines
                    // For this visual effect, we'll just draw a "valid" block
                    const y = yBase;
                    // This is a simplified visual representation
                    if (first) {
                        this.ctx.moveTo(x, yHigh);
                        first = false;
                    }
                    this.ctx.lineTo(x, yHigh);
                    this.ctx.lineTo(x, yLow);
                    // It's hard to draw a perfect bus waveform without more state, 
                    // so we'll stick to a digital line for now or improve later.
                    // Let's treat everything as digital lines for the background effect
                    const yLevel = point.v ? yHigh : yLow;
                    this.ctx.lineTo(x, yLevel);
                } else {
                    // Digital signal
                    const yLevel = point.v ? yHigh : yLow;
                    if (first) {
                        this.ctx.moveTo(x, yLevel);
                        first = false;
                    } else {
                        this.ctx.lineTo(x, this.ctx.lastY); // Horizontal
                        this.ctx.lineTo(x, yLevel); // Vertical transition
                    }
                    this.ctx.lastY = yLevel;
                }
            });

            this.ctx.stroke();
        });

        // Draw vertical cursor/trigger line
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('waveformCanvas');
    if (canvas) {
        new WaveformSystem(canvas);
    }
});
