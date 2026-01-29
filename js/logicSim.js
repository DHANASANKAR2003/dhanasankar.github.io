/**
 * Interactive Logic Circuit Builder
 * Allows users to select gates, build circuits, and run them
 */

class CircuitBuilder {
    constructor() {
        this.selectedGate = null;
        this.placedGates = [];
        this.inputs = { A: 0, B: 0, C: 0 };
        this.init();
    }

    init() {
        this.setupGatePalette();
        this.setupInputToggles();
        this.setupCanvas();
        this.setupControls();
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

    setupGatePalette() {
        const gateButtons = document.querySelectorAll('.gate-btn');
        gateButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all buttons
                gateButtons.forEach(b => b.classList.remove('active'));
                // Set this button as active
                btn.classList.add('active');
                this.selectedGate = btn.dataset.gate;
            });
        });
    }

    setupInputToggles() {
        ['A', 'B', 'C'].forEach(input => {
            const btn = document.getElementById(`input${input}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.inputs[input] = this.inputs[input] ? 0 : 1;
                    btn.textContent = this.inputs[input];
                    btn.classList.toggle('active', this.inputs[input] === 1);
                });
            }
        });
    }

    setupCanvas() {
        const canvas = document.getElementById('circuitCanvas');
        if (canvas) {
            canvas.addEventListener('click', (e) => {
                if (this.selectedGate && !e.target.closest('.placed-gate')) {
                    this.placeGate(this.selectedGate);
                }
            });
        }
    }

    setupControls() {
        const runBtn = document.getElementById('runCircuit');
        const clearBtn = document.getElementById('clearCircuit');

        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCircuit());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCircuit());
        }
    }

    placeGate(gateType) {
        const container = document.getElementById('placedGates');
        const placeholder = document.querySelector('.canvas-placeholder');

        if (placeholder) {
            placeholder.style.display = 'none';
        }

        const gateId = `gate-${Date.now()}`;
        const gateElement = document.createElement('div');
        gateElement.className = 'placed-gate';
        gateElement.id = gateId;
        gateElement.innerHTML = `
            <div class="gate-body">
                <span class="gate-type">${gateType}</span>
                <button class="remove-gate" data-id="${gateId}">&times;</button>
            </div>
            <div class="gate-inputs">
                <select class="input-select input-1">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
                ${gateType !== 'NOT' ? `
                <select class="input-select input-2">
                    <option value="B">B</option>
                    <option value="A">A</option>
                    <option value="C">C</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
                ` : ''}
            </div>
        `;

        // Add remove functionality
        gateElement.querySelector('.remove-gate').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeGate(gateId);
        });

        container.appendChild(gateElement);
        this.placedGates.push({ id: gateId, type: gateType, element: gateElement });
        this.updateExpression();
    }

    removeGate(gateId) {
        const element = document.getElementById(gateId);
        if (element) {
            element.remove();
        }
        this.placedGates = this.placedGates.filter(g => g.id !== gateId);
        this.updateExpression();

        if (this.placedGates.length === 0) {
            const placeholder = document.querySelector('.canvas-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        }
    }

    clearCircuit() {
        const container = document.getElementById('placedGates');
        if (container) {
            container.innerHTML = '';
        }
        this.placedGates = [];

        const placeholder = document.querySelector('.canvas-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }

        const output = document.getElementById('outputY');
        if (output) {
            output.textContent = '0';
            output.classList.remove('active');
        }

        const expressionDisplay = document.getElementById('expressionDisplay');
        if (expressionDisplay) {
            expressionDisplay.textContent = 'Select gates to build circuit';
        }
    }

    updateExpression() {
        const expressionDisplay = document.getElementById('expressionDisplay');
        if (!expressionDisplay) return;

        if (this.placedGates.length === 0) {
            expressionDisplay.textContent = 'Select gates to build circuit';
            return;
        }

        let expression = 'Y = ';
        const parts = [];

        this.placedGates.forEach(gate => {
            const input1Select = gate.element.querySelector('.input-1');
            const input2Select = gate.element.querySelector('.input-2');
            const in1 = input1Select ? input1Select.value : 'A';
            const in2 = input2Select ? input2Select.value : 'B';

            if (gate.type === 'NOT') {
                parts.push(`NOT(${in1})`);
            } else {
                parts.push(`${in1} ${gate.type} ${in2}`);
            }
        });

        expression += parts.join(' → ');
        expressionDisplay.textContent = expression;
    }

    runCircuit() {
        if (this.placedGates.length === 0) {
            alert('Please add at least one gate to run the circuit!');
            return;
        }

        let result = null;

        // Process each gate in sequence
        this.placedGates.forEach((gate, index) => {
            const input1Select = gate.element.querySelector('.input-1');
            const input2Select = gate.element.querySelector('.input-2');

            let in1Value = this.getInputValue(input1Select ? input1Select.value : 'A', result);
            let in2Value = input2Select ? this.getInputValue(input2Select.value, result) : 0;

            if (gate.type === 'NOT') {
                result = this.gateLogic.NOT(in1Value);
            } else {
                result = this.gateLogic[gate.type](in1Value, in2Value);
            }
        });

        // Display output
        const output = document.getElementById('outputY');
        if (output) {
            output.textContent = result;
            output.classList.toggle('active', result === 1);

            // Animation effect
            output.style.transform = 'scale(1.2)';
            setTimeout(() => {
                output.style.transform = 'scale(1)';
            }, 200);
        }

        this.updateExpression();
    }

    getInputValue(inputName, previousResult) {
        if (inputName === '0') return 0;
        if (inputName === '1') return 1;
        if (inputName === 'PREV' && previousResult !== null) return previousResult;
        return this.inputs[inputName] || 0;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CircuitBuilder();
});
