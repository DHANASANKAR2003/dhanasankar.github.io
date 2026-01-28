/**
 * Logic Simulation Lab - Interactive RTL Fundamentals
 */

class LogicSimulator {
    constructor() {
        this.inputA = 0;
        this.inputB = 0;
        this.gateType = 'AND';
        this.result = 0;

        this.init();
    }

    init() {
        this.btnA = document.getElementById('btnInA');
        this.btnB = document.getElementById('btnInB');
        this.gateSelect = document.getElementById('gateType');
        this.gateIcon = document.getElementById('gateIcon');
        this.outputY = document.getElementById('outY');

        if (!this.btnA) return;

        this.btnA.addEventListener('click', () => this.toggleInput('A'));
        this.btnB.addEventListener('click', () => this.toggleInput('B'));
        this.gateSelect.addEventListener('change', (e) => this.changeGate(e.target.value));

        this.update();
    }

    toggleInput(type) {
        if (type === 'A') {
            this.inputA = this.inputA === 1 ? 0 : 1;
            this.btnA.textContent = this.inputA;
            this.btnA.classList.toggle('active', this.inputA === 1);
        } else {
            this.inputB = this.inputB === 1 ? 0 : 1;
            this.btnB.textContent = this.inputB;
            this.btnB.classList.toggle('active', this.inputB === 1);
        }
        this.calculate();
    }

    changeGate(type) {
        this.gateType = type;
        this.gateIcon.textContent = type;
        this.calculate();
    }

    calculate() {
        const A = this.inputA;
        const B = this.inputB;

        switch (this.gateType) {
            case 'AND': this.result = A & B; break;
            case 'OR': this.result = A | B; break;
            case 'XOR': this.result = A ^ B; break;
            case 'NAND': this.result = !(A & B) ? 1 : 0; break;
            case 'NOR': this.result = !(A | B) ? 1 : 0; break;
            default: this.result = 0;
        }

        this.update();
    }

    update() {
        this.outputY.textContent = this.result;
        this.outputY.classList.toggle('active', this.result === 1);

        // Add a signal ripple effect in CSS if possible
        if (this.result === 1) {
            this.gateIcon.style.borderColor = 'var(--success)';
            this.gateIcon.style.boxShadow = '0 0 15px var(--success)';
        } else {
            this.gateIcon.style.borderColor = 'var(--primary)';
            this.gateIcon.style.boxShadow = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogicSimulator();
});
