/**
 * VLSI PORTFOLIO - PROJECT MANAGEMENT SYSTEM
 * Handles: Filtering, Modal Injection, and Async Card Loading
 */
const projectsData = [
    {
        id: 0,
        title: 'AXI4 to SPI with CDC Bridge',
        category: 'verification',
        image: 'images/axi_spi_cdc.png',
        description: 'Advanced RTL Design and Verification of AXI4 to SPI bridge featuring Clock Domain Crossing (CDC) with Asynchronous FIFO.',
        tags: ['Verilog', 'UVM', 'CDC', 'FIFO'],
        github: 'https://github.com/DHANASANKAR2003',
        details: `
          <h3>🚀 AXI4 to SPI CDC Bridge (RTL & DV)</h3>
          <p>This project implements a robust <strong>AXI4-Lite to SPI Bridge</strong> designed for high-performance SoC integration, handling asynchronous clock domains with high reliability.</p>
          <ul>
            <li>✅ <strong>RTL Design:</strong> Implemented AXI4-Lite slave interface and SPI Master controller with configurable CPOL/CPHA.</li>
            <li>✅ <strong>CDC Architecture:</strong> Utilized <strong>Asynchronous FIFO</strong> with Gray Code counters to safely transfer data between AXI (Fast) and SPI (Slow) clock domains.</li>
            <li>✅ <strong>Verification:</strong> Developed a comprehensive <strong>UVM Testbench</strong> with constrained-random stimulus and functional coverage.</li>
          </ul>
        `
    },
    {
        id: 1,
        title: 'I²C Protocol Implementation',
        category: 'verilog',
        image: 'images/i2c_waveform.jpeg',
        description: 'Complete I²C Master-Slave communication system with 1 Master and 5 unique Slaves in Verilog HDL.',
        tags: ['Verilog', 'Protocol', 'FSM'],
        github: 'https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/I2C%20Protocol',
        details: `
          <h3>🚀 I²C Protocol in Verilog (Master + 5 Slaves)</h3>
          <p>This project simulates a complete <strong>I²C Master-Slave Communication System</strong> with 1 Master and 5 unique Slaves, each identified by its 7-bit address.</p>
          <ul>
            <li>✅ Master initiates START & STOP conditions</li>
            <li>✅ Slave address decoding logic</li>
            <li>✅ FSM for both master & slaves</li>
            <li>✅ ACK/NACK response system</li>
          </ul>
        `
    },
    {
        id: 2,
        title: 'Sobel Edge Detection',
        category: 'verilog',
        image: 'images/sobel_output1.png',
        description: 'High-performance Sobel edge detection using Verilog with Python automation for image processing.',
        tags: ['Verilog', 'Image Processing', 'Python'],
        github: 'https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/256_x_256_Image_Processing',
        details: `
          <h3>🔍 Sobel Edge Detection using Verilog + Python</h3>
          <p>Real-time hardware-based edge detection module using the Sobel filter in Verilog.</p>
        `
    },
    {
        id: 3,
        title: '46-Filter Image Processing Engine',
        category: 'verilog',
        image: 'images/46filters_alloutput.png',
        description: 'Comprehensive image processing pipeline with 46 individual filters implemented in Verilog.',
        tags: ['Verilog', 'Image Processing', 'FPGA'],
        github: 'https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/256_x_256_Image_Processing'
    }
];

class ProjectManager {
    constructor() {
        this.projects = projectsData;
        this.currentFilter = 'all';
        this.displayedProjects = 6;
        this.grid = document.getElementById('projectsGrid');
        this.init();
    }

    init() {
        if (!this.grid) return;
        this.renderProjects();
        this.setupFilters();
    }

    renderProjects() {
        this.grid.innerHTML = '';
        const filtered = this.currentFilter === 'all'
            ? this.projects
            : this.projects.filter(p => p.category === this.currentFilter);

        filtered.forEach((p, i) => {
            const el = this.createCard(p, i);
            this.grid.appendChild(el);
        });
    }

    createCard(p, i) {
        const div = document.createElement('div');
        div.className = 'project-item reveal active'; // Use active for instant visibility
        div.style.transitionDelay = `${i * 0.1}s`;

        div.innerHTML = `
            <img src="${p.image}" alt="${p.title}" class="project-img" onerror="this.src='https://via.placeholder.com/800x500/050516/3fa2f6?text=${p.title}'">
            <div class="project-overlay">
                <span class="project-meta">${p.category.toUpperCase()} // RTL_CORE</span>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="btn btn-primary view-details" style="padding: 0.5rem 1rem; font-size: 0.7rem;">View Specs</button>
                    ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.7rem;"><i class="fab fa-github"></i> Code</a>` : ''}
                </div>
            </div>
        `;

        div.querySelector('.view-details').addEventListener('click', (e) => {
            e.stopPropagation();
            this.openModal(p);
        });

        return div;
    }

    setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.getAttribute('data-filter');
                this.renderProjects();
            });
        });
    }

    openModal(p) {
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBodyText');

        title.textContent = p.title;
        body.innerHTML = p.details || p.description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});
