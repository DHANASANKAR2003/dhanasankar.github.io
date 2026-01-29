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
        this.updateDisplay();
        this.generateTruthTable();
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
        let output;
        if (this.currentGate === 'NOT') {
            output = this.gateLogic.NOT(this.inputA);
        } else {
            output = this.gateLogic[this.currentGate](this.inputA, this.inputB);
        }

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
                const y = this.gateLogic.NOT(a);
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
                    const y = this.gateLogic[this.currentGate](a, b);
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
