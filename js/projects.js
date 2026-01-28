/**
 * ==========================================================================
 * DHANASANKAR K - PROFESSIONAL IP CORE REPOSITORY
 * Architecture: Industrial Specification Management
 * 
 * Logic Modules:
 * - Dynamic Card Allocation
 * - Tech Meta Injection
 * - Advanced Filtering Engine
 * ==========================================================================
 */

const industrialProjectPayload = [
    {
        id: "CORE_AXI_SPI_01",
        title: "AXI4-Lite to SPI Bridge with CDC",
        category: "verification",
        meta: "RTL // DV // PROTOCOL",
        image: "images/axi_spi_cdc.png",
        description: "Industrial-grade bridge architecture featuring 128-deep Asynchronous FIFOs and Gray-code synchronization for multi-clock domain stability.",
        technical_specs: {
            language: "Verilog / SystemVerilog",
            verification: "UVM 1.2 / SVA",
            target: "Artix-7 FPGA",
            throughput: "High-Efficiency Low Latency"
        },
        link: "https://github.com/DHANASANKAR2003"
    },
    {
        id: "CORE_I2C_MATRIX_02",
        title: "Multi-Slave I2C Protocol Engine",
        category: "verilog",
        meta: "FSM // RTL // BUS",
        image: "images/i2c_waveform.jpeg",
        description: "Scalable I2C infrastructure supporting clock stretching and multi-master arbitration, verified through constrained-random UVM environments.",
        technical_specs: {
            language: "Verilog HDL",
            verification: "Self-Checking Testbench",
            nodes: "1 Master + 5 Slaves",
            standard: "I2C-Standard @ 400kHz"
        },
        link: "https://github.com/DHANASANKAR2003"
    },
    {
        id: "CORE_DSP_FILTER_03",
        title: "46-Parallel DSP Filter Pipeline",
        category: "fpga",
        meta: "FPGA // DSP // ACCELERATOR",
        image: "images/46filters_alloutput.png",
        description: "Hardware-accelerated image filter pipeline optimized for Artix-7 silicon, achieving real-time image processing at 60 FPS.",
        technical_specs: {
            language: "Verilog",
            tools: "Xilinx Vivado 2019.2",
            utilization: "Optimized DSP Blocks",
            performance: "Real-time 256x256 @ 60FPS"
        },
        link: "https://github.com/DHANASANKAR2003"
    }
];

class IndustrialProjectManager {
    constructor() {
        this.container = document.getElementById('projectsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn-industrial');
        this.registry = industrialProjectPayload;

        this.init();
    }

    init() {
        if (!this.container) return;
        this.renderCollection(this.registry);
        this.initializeFilterLogic();
    }

    renderCollection(dataset) {
        this.container.innerHTML = '';
        dataset.forEach((project, index) => {
            const cardElement = this.constructIndustrialCard(project, index);
            this.container.appendChild(cardElement);
        });

        // Trigger reveal logic for new items
        if (window.trackSystem) {
            document.querySelectorAll('.reveal').forEach(el => window.trackSystem.observe(el));
        }
    }

    constructIndustrialCard(data, idx) {
        const wrapper = document.createElement('div');
        wrapper.className = 'project-industrial-item reveal';
        wrapper.style.animationDelay = `${idx * 0.15}s`;

        const markup = `
            <img src="${data.image}" class="project-industrial-img" alt="${data.title}" onerror="this.src='https://via.placeholder.com/800x550/03030d/00e5ff?text=INTERNAL_CORE_SPEC'">
            <div class="project-industrial-content">
                <span class="project-industrial-tag">${data.meta}</span>
                <h3 class="project-title">${data.title}</h3>
                <p style="font-size: 0.9rem; color: var(--clr-txt-med); margin-bottom: 2rem;">${data.description}</p>
                
                <div class="tech-spec-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; font-size: 0.7rem; font-family: 'JetBrains Mono'; color: var(--clr-brand-primary);">
                    <div>LANG: ${data.technical_specs.language || 'N/A'}</div>
                    <div>STAT: STABLE_RELEASE</div>
                    <div>UID: ${data.id}</div>
                    <div>ARCH: SILICON_OPTIMIZED</div>
                </div>

                <div class="flex-center" style="justify-content: flex-start; gap: 1rem;">
                    <a href="${data.link}" target="_blank" class="btn-industrial btn-outline-industrial" style="padding: 0.6rem 1.5rem; font-size: 0.7rem;">
                        INSPECT_SOURCE
                    </a>
                    <button class="btn-industrial" style="background: transparent; border: none; color: var(--clr-txt-low); padding: 0.6rem 1rem; font-size: 0.7rem;">
                        /TECHNICAL_DOC_v5
                    </button>
                </div>
            </div>
        `;

        wrapper.innerHTML = markup;
        return wrapper;
    }

    initializeFilterLogic() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-filter');
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (category === 'all') {
                    this.renderCollection(this.registry);
                } else {
                    const filtered = this.registry.filter(p => p.category === category);
                    this.renderCollection(filtered);
                }
            });
        });
    }
}

/**
 * [SYSTEM_INIT]
 * Project Engine Deployment
 */
document.addEventListener('DOMContentLoaded', () => {
    window.IP_CORES = new IndustrialProjectManager();
});

console.log('✔ INDUSTRIAL_PROJECT_MODULE: INITIALIZED');
