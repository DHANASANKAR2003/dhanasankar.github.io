// Projects Data and Management
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
      
      <h4>📌 Key Technical Highlights:</h4>
      <ul>
        <li>✅ <strong>RTL Design:</strong> Implemented AXI4-Lite slave interface and SPI Master controller with configurable CPOL/CPHA.</li>
        <li>✅ <strong>CDC Architecture:</strong> Utilized <strong>Asynchronous FIFO</strong> with Gray Code counters to safely transfer data between AXI (Fast) and SPI (Slow) clock domains.</li>
        <li>✅ <strong>Verification:</strong> Developed a comprehensive <strong>UVM Testbench</strong> with constrained-random stimulus and functional coverage.</li>
        <li>✅ <strong>CDC Analysis:</strong> Verified synchronizer chains and handled multi-bit signal transitions using FIFO based synchronization.</li>
      </ul>
      
      <h4>🛠️ Tools & Methodologies:</h4>
      <ul>
        <li>Verilog HDL / SystemVerilog</li>
        <li>UVM (Universal Verification Methodology)</li>
        <li>Asynchronous FIFO Design</li>
        <li>Xilinx Vivado / Questasim</li>
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
      
      <h4>📌 Core Features:</h4>
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
    },
    {
        id: 4,
        title: 'Synchronous FIFO Design',
        category: 'verilog',
        image: 'images/fifo_code1.png',
        description: 'Parameterized synchronous FIFO with full/empty flags and comprehensive testbench.',
        tags: ['Verilog', 'Memory', 'RTL Design']
    },
    {
        id: 5,
        title: 'Smart Traffic Light Controller',
        category: 'verilog',
        image: 'images/tfc_output1.png',
        description: 'FSM-based traffic light controller with adaptive timing and emergency vehicle priority.',
        tags: ['Verilog', 'FSM', 'Control Systems']
    }
];

class ProjectManager {
    constructor() {
        this.projects = projectsData;
        this.currentFilter = 'all';
        this.displayedProjects = 6;
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupFilters();
        this.setupLoadMore();
        this.setupModal();
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        const filteredProjects = this.currentFilter === 'all'
            ? this.projects
            : this.projects.filter(p => p.category === this.currentFilter);

        const projectsToShow = filteredProjects.slice(0, this.displayedProjects);

        projectsToShow.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            grid.appendChild(card);
        });

        if (window.initTilt) setTimeout(window.initTilt, 100);

        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredProjects.length > this.displayedProjects ? 'inline-flex' : 'none';
        }
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card animate-on-scroll animated';
        card.style.animationDelay = `${index * 0.1}s`;

        const hue = (project.id * 137.5) % 360;
        const fallbackGradient = `linear-gradient(135deg, hsl(${hue}, 60%, 15%), hsl(${hue + 40}, 60%, 25%))`;

        card.innerHTML = `
        <div class="card-image-wrapper">
          <img 
            src="${project.image}" 
            alt="${project.title}" 
            class="project-image" 
            onerror="this.onerror=null; this.parentElement.style.background='${fallbackGradient}'; this.style.display='none';"
          />
        </div>
        <div class="project-content">
          <div class="project-category">${project.category.toUpperCase()}</div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags ? project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('') : ''}
          </div>
        </div>
    `;

        card.addEventListener('click', () => this.openModal(project));
        return card;
    }

    setupFilters() {
        const btns = document.querySelectorAll('.filter-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.getAttribute('data-filter');
                this.renderProjects();
            });
        });
    }

    setupLoadMore() {
        const btn = document.getElementById('loadMoreBtn');
        if (btn) btn.addEventListener('click', () => {
            this.displayedProjects += 6;
            this.renderProjects();
        });
    }

    setupModal() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    openModal(project) {
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        if (!modal || !title || !body) return;

        title.textContent = project.title;
        body.innerHTML = project.details || `<p>${project.description}</p>`;
        modal.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});
