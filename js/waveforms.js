/**
 * VLSI PORTFOLIO - WAVEFORM VISUALIZER
 * Simulates high-precision digital signal traces on background canvas.
 */
class WaveformSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.signals = [];
        this.signalCount = 8;
        this.time = 0;
        this.speed = 1.5;
        this.colors = ['#00ff00', '#3fa2f6', '#ff3366', '#ffe600'];
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
        this.signalHeight = this.canvas.height / (this.signalCount + 4);
    }

    createSignals() {
        this.signals = [
            { name: 'CLK_50M', type: 'clock', period: 30, color: this.colors[1], data: [] },
            { name: 'RST_ASYNC_N', type: 'stable', value: 1, color: this.colors[2], data: [] },
            { name: 'AXI4_ADDR[31:0]', type: 'bus', color: this.colors[0], data: [] },
            { name: 'AXI4_WDATA[31:0]', type: 'bus', color: this.colors[3], data: [] },
            { name: 'SPI_MOSI', type: 'bit', color: this.colors[1], data: [], changeProb: 0.05 },
            { name: 'FIFO_EMPTY', type: 'bit', color: this.colors[2], data: [], changeProb: 0.02 }
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
            // Keep buffer reasonable
            if (signal.data.length > 1000) signal.data.shift();
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 0.3;
        this.ctx.lineWidth = 1;
        this.ctx.font = '9px "Fira Code", monospace';

        this.signals.forEach((signal, index) => {
            const yBase = (index + 2) * this.signalHeight;
            const yHigh = yBase - 12;
            const yLow = yBase + 12;

            this.ctx.strokeStyle = signal.color;
            this.ctx.fillStyle = signal.color;
            this.ctx.fillText(signal.name, 20, yBase);

            this.ctx.beginPath();
            let first = true;
            signal.data.forEach(point => {
                const x = this.canvas.width - (this.time - point.t);
                if (x < 120 || x > this.canvas.width) return;
                const yLevel = point.v ? yHigh : yLow;
                if (first) {
                    this.ctx.moveTo(x, yLevel);
                    first = false;
                } else {
                    this.ctx.lineTo(x, yLevel);
                }
            });
            this.ctx.stroke();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Only inject waveform canvas if it exists in HTML
    let canvas = document.getElementById('waveformCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'waveformCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-3';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.4';
        document.body.appendChild(canvas);
    }
    new WaveformSystem(canvas);
});
