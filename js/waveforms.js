class WaveformSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.signals = [];
        this.signalCount = 8;
        this.time = 0;
        this.speed = 2;
        this.scale = 20;

        this.colors = ['#00ff00', '#00cfff', '#ff0055', '#ffe600'];
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
            { name: 'CLK', type: 'clock', period: 40, color: this.colors[1], data: [] },
            { name: 'RST_N', type: 'stable', value: 1, color: this.colors[2], data: [] },
            { name: 'ADDR[31:0]', type: 'bus', color: this.colors[0], data: [] },
            { name: 'WDATA[31:0]', type: 'bus', color: this.colors[3], data: [] },
            { name: 'READY', type: 'bit', color: this.colors[1], data: [], changeProb: 0.02 }
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
            signal.data = signal.data.filter(d => d.t > this.time - this.canvas.width - 100);
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1;
        this.ctx.font = '10px "Fira Code", monospace';

        this.signals.forEach((signal, index) => {
            const yBase = (index + 1) * this.signalHeight;
            const yHigh = yBase - 15;
            const yLow = yBase + 15;

            this.ctx.strokeStyle = signal.color;
            this.ctx.fillStyle = signal.color;
            this.ctx.fillText(signal.name, 10, yBase);

            this.ctx.beginPath();
            let first = true;
            signal.data.forEach(point => {
                const x = point.t - (this.time - this.canvas.width);
                if (x < 100) return;
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
    const canvas = document.getElementById('waveformCanvas');
    if (canvas) new WaveformSystem(canvas);
});
