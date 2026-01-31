/**
 * VLSI Project Inventory - Comprehensive Database
 * Tailored for a Trained Fresher showcasing RTL & DV expertise.
 */

const projectsData = [
    {
        id: "axi_spi",
        title: "AXI4 to SPI Bridge RTL Design",
        category: "Verilog",
        shortDesc: "A robust AXI4 to SPI Bridge with Async FIFO CDC",
        tags: ["Verilog", "CDC", "Async FIFO", "AXI4"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/AXI4-TO-SPI",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Overview</h4>
                    <p>Designed to interface high-speed AXI4-compliant masters with slower SPI peripherals. Features fully verified bridge module handling Clock Domain Crossing (CDC) using asynchronous FIFOs.</p>
                    <ul class="tech-list">
                        <li><strong>Clock Domains:</strong> AXI (Fast), SPI (Slow)</li>
                        <li><strong>CDC:</strong> 2-stage synchronization with Gray-coded pointers.</li>
                        <li><strong>Burst Support:</strong> INCR burst type auto-split to SPI.</li>
                    </ul>
                    <h4>FSM Logic</h4>
                    <p><strong>Write FSM:</strong> Handles AW, W, B channels. Pops from FIFO -> SPI Request -> Response.<br>
                    <strong>Read FSM:</strong> Handles AR, R channels. Pops Addr -> SPI Request -> Push Data to FIFO.</p>
                </div>
            `,
            verification: `
                <div class="verif-specs">
                    <h4>Verification (100% Coverage)</h4>
                    <p>Comprehensive testbench verifying single beats, bursts, strobes, and boundary cases.</p>
                    <ul class="tech-list">
                        <li><strong>Test Cases:</strong> Single Write/Read, Strobe Tests, Transaction ID, Burst Ops.</li>
                        <li><strong>Result:</strong> 59/59 Tests Passed (100% Success Rate).</li>
                    </ul>
                </div>
            `,
            ports: [
                { name: "s_axi_aclk", dir: "Input", bits: "1", desc: "AXI Clock" },
                { name: "spi_mosi", dir: "Output", bits: "1", desc: "Master Out Slave In" },
                { name: "spi_miso", dir: "Input", bits: "1", desc: "Master In Slave Out" }
            ],
            specs: ["FIFO Depth: 16", "SPI Mode: 0 (CPOL=0, CPHA=0)", "AXI Data/Addr: 32-bit"]
        }
    },
    {
        id: "i2c_master",
        title: "I²C Master-Slave Protocol FSM",
        category: "Verilog",
        shortDesc: "Comprehensive I²C Controller (Master + 5 Slaves) with bit-level arbitration.",
        tags: ["Verilog", "Protocol", "FSM", "RTL"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/I2C%20Protocol",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Internal FSM Design</h4>
                    <p>Designed a robust FSM handling Start/Stop conditions, 7-bit addressing, and ACK/NACK logic.</p>
                    <ul class="tech-list">
                        <li><strong>States:</strong> IDLE, START, ADDRESS, READ_ACK, WRITE_DATA, WRITE_ACK, READ_DATA, STOP.</li>
                        <li><strong>Slaves:</strong> 5 Independent Slave Controllers with unique addresses.</li>
                        <li><strong>Features:</strong> Clock stretching support, Open-drain logic emulation.</li>
                    </ul>
                </div>
            `,
            keyFeatures: ["Master Controller", "5x Slave Nodes", "Bit-level SCL/SDA Control"],
            ports: [
                { name: "sda", dir: "Inout", desc: "Serial Data" },
                { name: "scl", dir: "Output", desc: "Serial Clock" },
                { name: "addr", dir: "Input", bits: "7", desc: "Target Address" }
            ]
        }
    },
    {
        id: "sobel_fpga",
        title: "FPGA-Based Sobel Edge Detection",
        category: "FPGA",
        shortDesc: "Full pipeline: Image -> Python -> Verilog (Artix-7) -> Python -> Edge Detected Image.",
        tags: ["Verilog", "Python", "Image Proc", "DSP", "Vivado"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/256_x_256_Image_Processing",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Pipeline Architecture</h4>
                    <p><strong>1. Python Pre-processing:</strong> Converts 256x256 image to 8-bit grayscale pixels (pixels_output.txt).</p>
                    <p><strong>2. Verilog Core (Sobel):</strong>
                        <ul>
                            <li><strong>Line Buffers:</strong> Stores 3 image rows for 3x3 sliding window.</li>
                            <li><strong>Convolution:</strong> Computes Gx and Gy gradients.</li>
                            <li><strong>Magnitude:</strong> |Gx| + |Gy| clamped to 8-bit.</li>
                        </ul>
                    </p>
                    <p><strong>3. Python Post-processing:</strong> Reconstructs image from Sobel_output.txt.</p>
                </div>
            `,
            specs: ["Resolution: 256x256", "Latency: ~1 pixel/clk", "Target: Artix-7 / DE2-70"],
            ports: [
                { name: "clk", dir: "Input", bits: "1", desc: "System Clock" },
                { name: "pixel_in", dir: "Input", bits: "8", desc: "Grayscale Pixel" },
                { name: "pixel_out", dir: "Output", bits: "8", desc: "Edge Magnitude" }
            ]
        }
    },

    {
        id: "traffic_ctrl",
        title: "Smart Traffic Light Controller",
        category: "Verilog",
        shortDesc: "4-Way Intersection Controller with Sensor-based timing and Emergency Override.",
        tags: ["Verilog", "FSM", "Control"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/blob/main/Verilog%20Project/Traffic_Light_Controller.v",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>FSM Control Logic</h4>
                    <p>Implements a structured state machine for a 4-way intersection. Features dynamic timing based on density sensors (if simulated) or fixed priority rotation.</p>
                    <ul class="tech-list">
                        <li><strong>States:</strong> N_S_GREEN, N_S_YELLOW, E_W_GREEN, E_W_YELLOW.</li>
                        <li><strong>Emergency Mode:</strong> Global Red-blink or specific Green path for emergency vehicles.</li>
                    </ul>
                </div>
            `,
            modes: ["Day Mode", "Night Mode (Blink)", "Emergency Override"]
        }
    },
    {
        id: "sync_fifo",
        title: "Synchronous FIFO Memory",
        category: "Verilog",
        shortDesc: "High-speed data buffer with circular pointer logic and full/empty flags.",
        tags: ["Verilog", "Memory", "FIFO"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/blob/main/COMBINATIONAL/DAY%207%20/Synchronous%20FIFO.v",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Memory Architecture</h4>
                    <p>Standard Synchronous FIFO design using a dual-port RAM array (simulated) or register file.</p>
                    <ul class="tech-list">
                        <li><strong>Pointers:</strong> Circular Read and Write pointers.</li>
                        <li><strong>Flags:</strong> Empty, Full, Almost Empty, Almost Full generation.</li>
                        <li><strong>Reset:</strong> Synchronous reset logic.</li>
                    </ul>
                </div>
            `,
            specs: ["Depth: 16/32 Words", "Width: 8/32 Bits", "Zero Latency Read (optional)"]
        }
    },
    {
        id: "sv_async_fifo",
        title: "Async FIFO Functional Verification",
        category: "SystemVerilog",
        shortDesc: "SystemVerilog Verification Environment for Asynchronous FIFO with CDC coverage.",
        tags: ["SystemVerilog", "CDC", "Assertion", "Coverage"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Functional%20Verification%20Using%20System%20Verilog/Asynchronous%20FIFO",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Verification Environment</h4>
                    <p>Robust Layered Testbench developed in SystemVerilog to verify Async FIFO correctness across clock domains.</p>
                    <ul class="tech-list">
                        <li><strong>CDC Checks:</strong> Verified Gray pointer synchronization and Empty/Full flag timing.</li>
                        <li><strong>Randomization:</strong> Constrained random constraints for read/write bursts.</li>
                        <li><strong>Assertions:</strong> SVA assertions for CDC stability and flag validity.</li>
                    </ul>
                </div>
            `,
            verification: `
                <div class="verif-specs">
                    <h4>Verification Features</h4>
                    <p>Functional Coverage Checks: 100%.</p>
                    <ul class="tech-list">
                        <li><strong>Scoreboard:</strong> Automated data integrity check using a queue-based reference model.</li>
                        <li><strong>Coverage:</strong> Cross coverage of Read/Write pointers and bin usage.</li>
                    </ul>
                </div>
            `
        }
    },
    {
        id: "sv_dff",
        title: "D-Flip Flop Verification IP",
        category: "SystemVerilog",
        shortDesc: "Basic SV Verification environment establishing Driver, Monitor, and Scoreboard methodology.",
        tags: ["SystemVerilog", "OOTB", "Randomization"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Functional%20Verification%20Using%20System%20Verilog/D%20flip%20flop",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Testbench Architecture</h4>
                    <p>Modular environment meant to demonstrate standard OOP-based verification practices.</p>
                    <ul class="tech-list">
                        <li><strong>Generator:</strong> Generates randomized D input patterns.</li>
                        <li><strong>Driver/Monitor:</strong> Drives signals and samples output at clock edges.</li>
                        <li><strong>Scoreboard:</strong> Compares Q output against expected value (D_delayed).</li>
                    </ul>
                </div>
            `
        }
    },
    {
        id: "sv_spram",
        title: "Single Port RAM Verification",
        category: "SystemVerilog",
        shortDesc: "Verification of 16x32 Single Port RAM using Constrained Random Verification.",
        tags: ["SystemVerilog", "Memory", "Testbench"],
        github: "https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Functional%20Verification%20Using%20System%20Verilog/SP%20RAM",
        fullDetails: {
            architecture: `
                <div class="arch-block">
                    <h4>Memory Verification</h4>
                    <p>Verified read/write operations of a Single Port RAM model.</p>
                    <ul class="tech-list">
                        <li><strong>Scenarios:</strong> Back-to-back Read/Write, Simultaneous Enable/Write assertions.</li>
                        <li><strong>Data Integrity:</strong> Verified stored data matches written data across all addresses.</li>
                    </ul>
                </div>
            `,
            specs: ["Address Depth: 16", "Data Width: 32", "Verification: Layered OOP TB"]
        }
    },

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
        // Clear all grids
        const grids = {
            uvm: document.getElementById('grid-uvm'),
            sv: document.getElementById('grid-sv'),
            verilog: document.getElementById('grid-verilog'),
            fpga: document.getElementById('grid-fpga')
        };

        Object.values(grids).forEach(g => { if (g) g.innerHTML = ''; });

        projectsData.forEach((p, idx) => {
            // Determine target grid
            let targetGrid = null;
            const cat = p.category.toLowerCase();
            const tags = p.tags.map(t => t.toLowerCase());

            if (cat === 'verification' || tags.includes('uvm')) {
                targetGrid = grids.uvm;
            } else if (cat === 'fpga' || tags.includes('fpga')) {
                targetGrid = grids.fpga;
            } else if (cat === 'systemverilog' || tags.includes('systemverilog')) {
                targetGrid = grids.sv;
            } else if (cat === 'verilog' || tags.includes('verilog')) {
                targetGrid = grids.verilog;
            } else {
                // Filter out non-VLSI (Embedded/IoT) projects
                return;
            }

            if (!targetGrid) return;

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
            targetGrid.appendChild(card);
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
