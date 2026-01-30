/**
 * VLSI Project Inventory - Comprehensive Database
 * Tailored for a Trained Fresher showcasing RTL & DV expertise.
 */

const projectsData = [
    {
        id: "axi_spi",
        title: "AXI4-Lite to SPI Bridge with CDC",
        category: "Verification",
        shortDesc: "Comprehensive Design & Verification of an asynchronous bridge using UVM and Asynchronous FIFOs.",
        tags: ["Verilog", "UVM", "CDC", "Async FIFO"],
        github: "https://github.com/DHANASANKAR2003",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Design Architecture</h4>
                    <p>The system consists of an AXI4-Lite Slave interface receiving CPU commands, which are then pushed through a Clock Domain Crossing (CDC) boundary via an Asynchronous FIFO to an SPI Master controller operating on a separate, slower clock.</p>
                    <ul class="tech-list">
                        <li><strong>Clock Domains:</strong> AXI_CLK (100MHz), SPI_CLK (10MHz)</li>
                        <li><strong>CDC Technique:</strong> Asynchronous FIFO with Gray-coded read/write pointers for pointer synchronization.</li>
                        <li><strong>Handshaking:</strong> Full/Empty flag logic implemented with dual-flip-flop synchronizers.</li>
                    </ul>
                </div>
            `,
            verification: `
                <div class="verif-specs">
                    <h4>Verification Strategy (UVM)</h4>
                    <table class="verif-table">
                        <tr><th>Component</th><th>Description</th></tr>
                        <tr><td>Sequencer</td><td>Generates constrained random AXI transactions (burst vs single).</td></tr>
                        <tr><td>Driver</td><td>Implements AXI4-Lite signaling & protocol handshakes.</td></tr>
                        <tr><td>Monitor</td><td>Captures AXI/SPI interface traffic for coverage & scoreboard.</td></tr>
                        <tr><td>Scoreboard</td><td>Model-based checking using a Reference SPI Model.</td></tr>
                    </table>
                    <p class="cov-info">Functional Coverage achieved: <strong>98%</strong> | Code Coverage: <strong>100%</strong></p>
                </div>
            `,
            ports: [
                { name: "s_axi_aclk", dir: "Input", desc: "AXI Clock Domain" },
                { name: "s_axi_awaddr", dir: "Input", bits: "32", desc: "Write Address" },
                { name: "spi_mosi", dir: "Output", desc: "Serial Data Out" },
                { name: "spi_sck", dir: "Output", desc: "Serial Clock" }
            ]
        }
    },
    {
        id: "i2c_master",
        title: "I²C Master-Slave Protocol Engine",
        category: "Verilog",
        shortDesc: "Multi-slave addressing system with 7-bit addressing and 4-state FSM implementation.",
        tags: ["Verilog", "Protocol", "FSM", "RTL"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/I2C%20Protocol",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>RTL Framework</h4>
                    <p>A robust I²C implementation featuring a controller with programmable SCL frequency and support for START/STOP/REPEATED START conditions.</p>
                    <ul class="tech-list">
                        <li><strong>FSM states:</strong> IDLE, START, ADDR, DATA, ACK, STOP.</li>
                        <li><strong>Slaves:</strong> 1 Master connected to 5 unique Slave IPs each with specialized 7-bit addresses.</li>
                    </ul>
                </div>
            `,
            keyFeatures: ["Open-drain buffer emulation", "Glitch filtering on SDA/SCL", "Multi-byte read/write support"],
            ports: [
                { name: "sda", dir: "Inout", desc: "Serial Data Line" },
                { name: "scl", dir: "Output", desc: "Serial Clock Line" },
                { name: "addr_in", dir: "Input", bits: "7", desc: "Slave Target Address" }
            ]
        }
    },
    {
        id: "sobel_fpga",
        title: "Sobel Edge Detection Processor",
        category: "FPGA",
        shortDesc: "Real-time hardware image convolution engine for edge detection on Xilinx Artix-7.",
        tags: ["Verilog", "Image Proc", "DSP", "Vivado"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/256_x_256_Image_Processing",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Pipelined Image Processor</h4>
                    <p>Implemented a 3x3 sliding window buffer using line buffers to process a 256x256 image stream in real-time.</p>
                    <div class="math-block">G = sqrt(Gx² + Gy²) approximated as |Gx| + |Gy|</div>
                    <ul class="tech-list">
                        <li><strong>Kernel:</strong> Sobel operators for X and Y direction gradients.</li>
                        <li><strong>Throughput:</strong> 1 pixel/clock cycle after initial latency.</li>
                    </ul>
                </div>
            `,
            specs: ["Target Device: XC7A35T (Artix-7)", "Max Frequency: 215MHz", "Power usage: < 200mW"],
            ports: [
                { name: "pixel_in", dir: "Input", bits: "8", desc: "Grayscale input pixel" },
                { name: "pixel_out", dir: "Output", bits: "8", desc: "Edge-detected output pixel" }
            ]
        }
    },
    {
        id: "traffic_ctrl",
        title: "Smart Traffic Light FSM Controller",
        category: "Verilog",
        shortDesc: "Adaptive timing controller with emergency override and complex state-transition logic.",
        tags: ["FSM", "Digital Logic", "Control"],
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>System State Machine</h4>
                    <p>Designed a complex Mealy state machine that adapts traffic light cycles based on sensor inputs (Vehicle detection in specific lanes) and priority interrupts (Emergency vehicles).</p>
                </div>
            `,
            modes: ["Adaptive Mode", "Fixed Interval Mode", "Emergency Override Mode"]
        }
    }
    ,
    {
        id: "uart_loopback",
        title: "UART Loopback Communication",
        category: "Verilog",
        shortDesc: "Reliable serial communication system with FSM-controlled TX/RX and full-duplex data transfer.",
        tags: ["Verilog", "UART", "FSM", "Custom IP"],
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>UART Architecture</h4>
                    <p>Designed a UART-based loopback system with FSM-controlled TX and RX modules in Verilog for reliable serial communication. Implemented full-duplex data transfer where transmitted bytes were echoed back to verify correct reception.</p>
                </div>
            `,
            verification: `
                <div class="verif-specs">
                     <h4>Verification & Implementation</h4>
                     <p>Simulated and verified UART functionality using a structured testbench and GTKWave waveform analysis. Developed the UART master as a reusable Custom IP in Vivado for FPGA-based communication designs.</p>
                </div>
            `
        }
    },
    {
        id: "solar_tracker",
        title: "Dual Axis Solar Tracker",
        category: "Embedded",
        shortDesc: "Automated solar panel alignment system using dual-axis rotation for maximum energy efficiency.",
        tags: ["Arduino", "Embedded", "Sensors", "C++"],
        fullDetails: {
            architecture: `
                 <div class="arch-block">
                    <h4>System Overview</h4>
                    <p>Developed a solar tracking system to align panels with the sun’s movement using dual-axis rotation. Enhanced energy efficiency by continuously optimizing panel orientation based on real-time light intensity.</p>
                </div>
            `,
            keyFeatures: ["LDR (Light Dependent Resistor) sensing", "Servo motor control logic", "Real-time optimization"]
        }
    },
    {
        id: "color_sorter",
        title: "Color-Based Product Sorting",
        category: "Embedded",
        shortDesc: "Automated sorting system using color sensors and servo mechanisms for industrial applications.",
        tags: ["Arduino", "TCS3200", "Automation", "Servo"],
        fullDetails: {
            architecture: `
                 <div class="arch-block">
                    <h4>Sorting Mechanism</h4>
                    <p>Built an automated sorting system using TCS3200 color sensor and servo-based diverter mechanism. Programmed the system to detect object color and classify items into specific output bins.</p>
                </div>
            `,
            keyFeatures: ["TCS3200 Color Sensor", "Servo Diverter", "Automated Binning"]
        }
    },
    {
        id: "smart_fertilizer",
        title: "IoT Smart Fertilizer System",
        category: "IoT",
        shortDesc: "Smart agriculture system for fertilizer and water control using NodeMCU and mobile app monitoring.",
        tags: ["NodeMCU", "IoT", "Blynk", "Sensors"],
        fullDetails: {
            architecture: `
                 <div class="arch-block">
                    <h4>IoT Architecture</h4>
                    <p>Uses NodeMCU (ESP8266) microcontroller for control. Three solenoid valves are used for fertilizer and water control. System helps in smart and efficient fertilizer management.</p>
                </div>
            `,
            keyFeatures: ["NodeMCU (ESP8266)", "Solenoid Valves", "Blynk Mobile App", "DHT11/DHT22 Sensors"]
        }
    }
];

class ProjectManager {
    constructor() {
        this.grid = document.getElementById('projectsGrid');
        this.modal = document.getElementById('projectModal');
        this.render();
        this.setupModalEvents();
    }

    render() {
        if (!this.grid) return;
        this.grid.innerHTML = '';
        projectsData.forEach((p, idx) => {
            const card = document.createElement('div');
            card.className = 'project-card animate-on-scroll';
            card.style.transitionDelay = `${idx * 0.1}s`;
            card.innerHTML = `
                <div class="card-meta">
                    <span class="category-tag">${p.category}</span>
                    <i class="fas fa-expand-alt open-icon"></i>
                </div>
                <h3>${p.title}</h3>
                <p class="desc">${p.shortDesc}</p>
                <div class="tag-row">
                    ${p.tags.map(t => `<span class="mini-tag">${t}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <button class="btn-text detail-btn" onclick="projectManager.openProject('${p.id}')">View Architecture</button>
                    ${p.github ? `<a href="${p.github}" target="_blank" class="github-link"><i class="fab fa-github"></i></a>` : ''}
                </div>
            `;
            this.grid.appendChild(card);
        });
    }

    setupModalEvents() {
        if (!this.modal) return;
        const closeBtn = this.modal.querySelector('.modal-exit');
        closeBtn.onclick = () => this.modal.classList.remove('active');
        this.modal.onclick = (e) => { if (e.target === this.modal) this.modal.classList.remove('active'); };
    }

    openProject(id) {
        const p = projectsData.find(proj => proj.id === id);
        if (!p) return;

        const content = this.modal.querySelector('.modal-body-content');
        content.innerHTML = `
            <div class="modal-header-info">
                <span class="category-main">${p.category}</span>
                <h2>${p.title}</h2>
                <div class="modal-tags">
                     ${p.tags.map(t => `<span class="tag-item">${t}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-main-grid">
                <div class="modal-left">
                    ${p.fullDetails.architecture || ''}
                    ${p.fullDetails.verification || ''}
                    ${p.fullDetails.specs ? `
                        <div class="specs-block">
                            <h4>Design Specs</h4>
                            <ul>${p.fullDetails.specs.map(s => `<li>${s}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                </div>
                <div class="modal-right">
                    ${p.fullDetails.ports ? `
                        <h4>Interface / Port List</h4>
                        <table class="port-table">
                            <thead><tr><th>Name</th><th>Dir</th><th>Width</th><th>Description</th></tr></thead>
                            <tbody>
                                ${p.fullDetails.ports.map(port => `
                                    <tr>
                                        <td class="code-font">${port.name}</td>
                                        <td class="dir-${port.dir.toLowerCase()}">${port.dir}</td>
                                        <td>${port.bits || '1'}</td>
                                        <td class="desc-cell">${port.desc}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : `
                        <div class="placeholder-technical">
                            <i class="fas fa-project-diagram"></i>
                            <p>Schematic and Interface details are strictly for recruiter evaluation.</p>
                        </div>
                    `}
                </div>
            </div>
            
            ${p.github ? `
                <div class="modal-footer-actions">
                    <a href="${p.github}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> Code Repository</a>
                </div>
            ` : ''}
        `;

        this.modal.classList.add('active');
    }
}

// Global scope instantiation for onclick access
let projectManager;
document.addEventListener('DOMContentLoaded', () => {
    projectManager = new ProjectManager();
});
