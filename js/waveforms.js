class WaveformSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.signals = [];
        this.signalCount = 8;
        this.time = 0;
        this.speed = 1.5;
        this.scale = 20;

        // VLSI Theme Colors - Enhanced Cyan/Aquamarine
        this.colors = ['#00f2ff', '#20ffc9', '#ff00ff', '#ffe600'];
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
        this.signals = [
            { name: 'CLK_50MHz', type: 'clock', period: 30, color: this.colors[0], data: [] },
            { name: 'RST_N', type: 'stable', value: 1, color: this.colors[2], data: [] },
            { name: 'ADDR_BUS[31:0]', type: 'bus', color: this.colors[1], data: [] },
            { name: 'DATA_BUS[31:0]', type: 'bus', color: this.colors[3], data: [] },
            { name: 'AXI4_VALID', type: 'bit', color: this.colors[0], data: [], changeProb: 0.015 },
            { name: 'SPI_MOSI', type: 'bit', color: this.colors[1], data: [], changeProb: 0.03 },
            { name: 'FIFO_EMPTY', type: 'bit', color: this.colors[2], data: [], changeProb: 0.01 }
        ];
    }

    update() {
        this.time += this.speed;
        this.signals.forEach(signal => {
            if (signal.type === 'clock') {
                const val = Math.floor(this.time / (signal.period / 2)) % 2;
                signal.data.push({ t: this.time, v: val });
            } else {
                if (Math.random() < (signal.changeProb || 0.01)) {
                    signal.value = Math.random() > 0.5 ? 1 : 0;
                }
                signal.data.push({ t: this.time, v: signal.value || 0 });
            }
            // Keep data within screen bounds
            signal.data = signal.data.filter(d => d.t > this.time - this.canvas.width - 200);
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1.5;
        this.ctx.font = '12px "Fira Code", monospace';

        this.signals.forEach((signal, index) => {
            const yBase = (index + 1) * this.signalHeight + 100; // Offset from top
            const yHigh = yBase - 15;
            const yLow = yBase + 15;

            // Draw Label
            this.ctx.fillStyle = signal.color;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillText(signal.name, 20, yBase);

            // Draw Waveform
            this.ctx.strokeStyle = signal.color;
            this.ctx.beginPath();

            let first = true;
            signal.data.forEach(point => {
                const x = point.t - (this.time - this.canvas.width);
                if (x < 150) return; // Skip if too close to label area

                const yLevel = point.v ? yHigh : yLow;
                if (first) {
                    this.ctx.moveTo(x, yLevel);
                    first = false;
                } else {
                    // Square wave transitions
                    const prevX = (point.t - this.speed) - (this.time - this.canvas.width);
                    this.ctx.lineTo(x, yLevel);
                }
            });

            // Add slight glow to waveforms
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = signal.color;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('waveformCanvas');
    if (canvas) new WaveformSystem(canvas);
});
