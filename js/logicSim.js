/**
 * Interactive Logic Gate Simulator
 * Click a gate, change inputs, see output immediately
 */

class GateSimulator {
    constructor() {
        this.currentGate = 'AND';
        this.inputA = 0;
        this.inputB = 0;
        this.init();
    }

    // Gate logic functions
    gateLogic = {
        AND: (a, b) => a & b,
        OR: (a, b) => a | b,
        NOT: (a) => a ? 0 : 1,
        NAND: (a, b) => (a & b) ? 0 : 1,
        NOR: (a, b) => (a | b) ? 0 : 1,
        XOR: (a, b) => a ^ b,
        XNOR: (a, b) => (a ^ b) ? 0 : 1
    };

    // Gate expressions
    gateExpressions = {
        AND: 'Y = A · B',
        OR: 'Y = A + B',
        NOT: 'Y = A\'',
        NAND: 'Y = (A · B)\'',
        NOR: 'Y = (A + B)\'',
        XOR: 'Y = A ⊕ B',
        XNOR: 'Y = (A ⊕ B)\''
    };

    init() {
        this.setupGateButtons();
        this.setupInputButtons();
        this.setupCanvas();
        this.updateDisplay();
        this.generateTruthTable();

        // Start animation/refresh loop for timing diagram
        this.startSimulationLoop();
    }

    setupCanvas() {
        this.canvas = document.getElementById('waveformCanvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }
    }

    resizeCanvas() {
        if (this.canvas) {
            const container = this.canvas.parentElement;
            this.canvas.width = container.clientWidth;
            this.canvas.height = 180; // Fixed height for 3 signals
            this.drawWaveforms();
        }
    }

    startSimulationLoop() {
        // Record state periodically (simulated clock)
        setInterval(() => {
            this.recordState();
            this.drawWaveforms();
        }, 100);
    }

    recordState() {
        const output = this.calculateOutput();
        this.history.push({
            a: this.inputA,
            b: this.inputB,
            y: output
        });

        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    calculateOutput() {
        if (this.currentGate === 'NOT') {
            return this.gateLogic.NOT(this.inputA);
        } else {
            return this.gateLogic[this.currentGate](this.inputA, this.inputB);
        }
    }

    drawWaveforms() {
        if (!this.ctx || !this.canvas) return;

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        const signals = [
            { label: 'A', data: this.history.map(h => h.a), color: '#00f2ff' },
            { label: 'B', data: this.history.map(h => h.b), color: '#bd00ff' },
            { label: 'Y', data: this.history.map(h => h.y), color: '#00ff9d' }
        ];

        const rowHeight = h / 3;
        const step = w / this.maxHistory;

        signals.forEach((sig, idx) => {
            const baseline = (idx + 1) * rowHeight - 20;
            const highLevel = baseline - 30;

            // Draw grid line
            ctx.strokeStyle = 'rgba(0, 242, 255, 0.05)';
            ctx.beginPath();
            ctx.moveTo(0, baseline);
            ctx.lineTo(w, baseline);
            ctx.stroke();

            // Draw Signal
            ctx.strokeStyle = sig.color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 5;
            ctx.shadowColor = sig.color;

            ctx.beginPath();

            for (let i = 0; i < this.history.length; i++) {
                const x = i * step;
                const val = sig.data[i];
                const y = val ? highLevel : baseline;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    // Vertical transition
                    const prevVal = sig.data[i - 1];
                    if (prevVal !== val) {
                        ctx.lineTo(x, val ? baseline : highLevel);
                    }
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Label
            ctx.shadowBlur = 0;
            ctx.fillStyle = sig.color;
            ctx.font = '10px "Fira Code"';
            ctx.fillText(sig.label, 10, highLevel - 5);
        });
    }

    setupGateButtons() {
        const gateButtons = document.querySelectorAll('.gate-btn');
        gateButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                gateButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.currentGate = btn.dataset.gate;
                this.updateDisplay();
                this.generateTruthTable();

                // Show/hide input B for NOT gate
                const inputBWire = document.getElementById('inputBWire');
                if (inputBWire) {
                    inputBWire.style.display = this.currentGate === 'NOT' ? 'none' : 'flex';
                }
            });
        });
    }

    setupInputButtons() {
        const inputABtn = document.getElementById('inputA');
        const inputBBtn = document.getElementById('inputB');

        if (inputABtn) {
            inputABtn.addEventListener('click', () => {
                this.inputA = this.inputA ? 0 : 1;
                inputABtn.textContent = this.inputA;
                inputABtn.classList.toggle('active', this.inputA === 1);
                this.updateDisplay();
            });
        }

        if (inputBBtn) {
            inputBBtn.addEventListener('click', () => {
                this.inputB = this.inputB ? 0 : 1;
                inputBBtn.textContent = this.inputB;
                inputBBtn.classList.toggle('active', this.inputB === 1);
                this.updateDisplay();
            });
        }
    }

    updateDisplay() {
        // Calculate output
        const output = this.calculateOutput();

        // Update gate name
        const gateName = document.getElementById('gateName');
        if (gateName) {
            gateName.textContent = this.currentGate;
        }

        // Update output display
        const outputY = document.getElementById('outputY');
        if (outputY) {
            outputY.textContent = output;
            outputY.classList.toggle('active', output === 1);
        }

        // Update expression
        const exprDisplay = document.getElementById('boolExpression');
        if (exprDisplay) {
            exprDisplay.textContent = this.gateExpressions[this.currentGate];
        }

        // Highlight current row in truth table
        this.highlightTruthTableRow();
    }

    generateTruthTable() {
        const tbody = document.getElementById('truthTableBody');
        const thead = document.querySelector('.truth-table thead tr');
        if (!tbody || !thead) return;

        tbody.innerHTML = '';

        if (this.currentGate === 'NOT') {
            // NOT gate - single input
            thead.innerHTML = '<th>A</th><th>Y</th>';
            for (let a = 0; a <= 1; a++) {
                const tempA = this.inputA; // Save current state
                this.inputA = a;
                const y = this.calculateOutput();
                this.inputA = tempA; // Restore state

                const row = document.createElement('tr');
                row.dataset.a = a;
                row.innerHTML = `<td>${a}</td><td class="${y ? 'high' : ''}">${y}</td>`;
                tbody.appendChild(row);
            }
        } else {
            // Two-input gates
            thead.innerHTML = '<th>A</th><th>B</th><th>Y</th>';
            for (let a = 0; a <= 1; a++) {
                for (let b = 0; b <= 1; b++) {
                    const tempA = this.inputA;
                    const tempB = this.inputB;
                    this.inputA = a;
                    this.inputB = b;
                    const y = this.calculateOutput();
                    this.inputA = tempA;
                    this.inputB = tempB;

                    const row = document.createElement('tr');
                    row.dataset.a = a;
                    row.dataset.b = b;
                    row.innerHTML = `<td>${a}</td><td>${b}</td><td class="${y ? 'high' : ''}">${y}</td>`;
                    tbody.appendChild(row);
                }
            }
        }

        this.highlightTruthTableRow();
    }

    highlightTruthTableRow() {
        const tbody = document.getElementById('truthTableBody');
        if (!tbody) return;

        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            row.classList.remove('current');

            if (this.currentGate === 'NOT') {
                if (parseInt(row.dataset.a) === this.inputA) {
                    row.classList.add('current');
                }
            } else {
                if (parseInt(row.dataset.a) === this.inputA &&
                    parseInt(row.dataset.b) === this.inputB) {
                    row.classList.add('current');
                }
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GateSimulator();
});
