// Projects Data and Management
const projectsData = [
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
        <li>✅ Read and Write data support</li>
        <li>✅ SDA line handling with tri-state control</li>
      </ul>
      
      <h4>🧠 Tools Used:</h4>
      <ul>
        <li>Verilog HDL</li>
        <li>Icarus Verilog (Simulation)</li>
        <li>GTKWave (Waveform Viewer)</li>
      </ul>
      
      <div class="project-images">
        <img src="images/i2c_master_code.jpeg" alt="I2C Master Code" />
        <img src="images/i2c_waveform.jpeg" alt="I2C Waveform" />
      </div>
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
      <p>Real-time hardware-based edge detection module using the Sobel filter in Verilog, integrating Python for image preprocessing and post-simulation reconstruction.</p>
      
      <h4>🛠️ Tools Used:</h4>
      <ul>
        <li>Verilog HDL for RTL design</li>
        <li>Icarus Verilog and GTKWave for simulation</li>
        <li>Python (NumPy, PIL, OpenCV) for image processing</li>
        <li>Ubuntu Linux environment</li>
      </ul>
      
      <h4>🧠 Core Concepts:</h4>
      <ul>
        <li>Line Buffering and 3×3 kernel sliding window</li>
        <li>Horizontal and Vertical edge gradient calculation</li>
        <li>Signed to unsigned conversion</li>
        <li>Thresholding and clamping for visualization</li>
      </ul>
      
      <div class="project-images">
        <img src="sobel_output.png" alt="Sobel Output" />
        <img src="sobel_design_code.png" alt="Sobel RTL Code" />
        <img src="sobel_waveform.png" alt="Sobel Waveform" />
      </div>
    `
  },
  {
    id: 3,
    title: '46-Filter Image Processing Engine',
    category: 'verilog',
    image: 'images/46filters_alloutput.png',
    description: 'Comprehensive image processing pipeline with 46 individual filters implemented in Verilog.',
    tags: ['Verilog', 'Image Processing', 'FPGA'],
    github: 'https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/Verilog%20Project/256_x_256_Image_Processing',
    details: `
      <h3>🚀 46-Filter Image Processing Engine</h3>
      <p>High-performance image processing pipeline featuring 46 individual filters and effects applied on an 8-bit grayscale image.</p>
      
      <h4>💡 Features:</h4>
      <ul>
        <li>🔹 Brightness/Contrast Filters</li>
        <li>🔹 Bitwise Filters (Mask, XOR, Invert)</li>
        <li>🔹 Thresholding & Edge Detection (Sobel, Laplacian)</li>
        <li>🔹 Morphological Operations (Erosion, Dilation)</li>
        <li>🔹 Histogram Equalization, Gaussian Blur</li>
      </ul>
      
      <div class="project-images">
        <img src="images/46filters_code.png" alt="Filter Code" />
        <img src="images/46filters_alloutput.png" alt="All Filters Output" />
      </div>
    `
  },
  {
    id: 4,
    title: 'Synchronous FIFO Design',
    category: 'verilog',
    image: 'images/fifo_code1.png',
    description: 'Parameterized synchronous FIFO with full/empty flags and comprehensive testbench.',
    tags: ['Verilog', 'Memory', 'RTL Design'],
    github: 'https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/tree/main/COMBINATIONAL/DAY%207%20',
    details: `
      <h3>🚀 Synchronous FIFO Design in Verilog</h3>
      <p>Parameterized depth and data width FIFO with comprehensive verification.</p>
      
      <h4>📌 Highlights:</h4>
      <ul>
        <li>Parameterized depth and data width</li>
        <li>Used $clog2 for pointer sizing</li>
        <li>Full and Empty status flag logic</li>
        <li>Self-checking Verilog testbench</li>
        <li>Verified using Icarus Verilog and GTKWave</li>
      </ul>
      
      <div class="project-images">
        <img src="images/fifo_code.png" alt="FIFO Code" />
        <img src="images/fifo_waveform.png" alt="FIFO Waveform" />
      </div>
    `
  },
  {
    id: 5,
    title: 'Smart Traffic Light Controller',
    category: 'verilog',
    image: 'images/tfc_output1.png',
    description: 'FSM-based traffic light controller with adaptive timing and emergency vehicle priority.',
    tags: ['Verilog', 'FSM', 'Control Systems'],
    github: 'https://github.com/DHANASANKAR2003/VLSI-INTERN-Silicic-Innova-Technology-/blob/main/Verilog%20Project/Traffic_Light_Controller.v',
    details: `
      <h3>🚦 Smart Traffic Light Controller</h3>
      <p>Real-time Traffic Light Controller simulating a 4-way intersection using Verilog FSM.</p>
      
      <h4>💡 Core Concepts:</h4>
      <ul>
        <li>Mealy & Moore FSM principles</li>
        <li>Timer counters for red/yellow/green sequencing</li>
        <li>Edge detection for emergency signal</li>
        <li>Pedestrian crossing control</li>
        <li>Adaptive signal timing</li>
      </ul>
      
      <div class="project-images">
        <img src="images/tfc_code.png" alt="Traffic Light Code" />
        <img src="images/tfc_waveform.png" alt="Traffic Light Waveform" />
      </div>
    `
  },
  {
    id: 6,
    title: 'Sequential Circuits Design',
    category: 'verilog',
    image: 'images/seq_output1.jpeg',
    description: 'Comprehensive collection of sequential circuits including flip-flops, counters, and shift registers.',
    tags: ['Verilog', 'Sequential Logic', 'RTL'],
    github: 'https://github.com/DHANASANKAR2003',
    details: `
      <h3>🎉 Sequential Circuits in Verilog</h3>
      <p>Successfully designed and simulated major sequential circuits using Verilog HDL.</p>
      
      <h4>Implemented Circuits:</h4>
      <ul>
        <li>✅ D, T, JK, SR Flip-Flops</li>
        <li>✅ Up/Down Counters</li>
        <li>✅ Ring Counter</li>
        <li>✅ SISO, SIPO, PISO, PIPO Registers</li>
        <li>✅ Bidirectional & Universal Shift Registers</li>
      </ul>
      
      <div class="project-images">
        <img src="images/seq_code1.jpeg" alt="Sequential Code 1" />
        <img src="images/seq_waveform.jpeg" alt="Sequential Waveform" />
      </div>
    `
  },
  {
    id: 7,
    title: 'Real-Time FPGA Image Processing',
    category: 'fpga',
    image: 'images/fpga_project2.jpeg',
    description: 'High-performance FPGA-based real-time image processing with 46 filters on Artix-7.',
    tags: ['FPGA', 'Vivado', 'Real-Time'],
    github: 'https://github.com/DHANASANKAR2003',
    details: `
      <h3>🚀 Real-Time FPGA Image Processing</h3>
      <p>Advanced project implementing real-time image processing on Edge Artix-7 FPGA Board.</p>
      
      <h4>⚙️ System Architecture:</h4>
      <ul>
        <li>OV5640 camera module for image capture</li>
        <li>46 unique pixel-level filters</li>
        <li>6-bit switch-controlled filter selection</li>
        <li>Real-time VGA display output</li>
        <li>Sobel edge detection core</li>
      </ul>
      
      <h4>🧠 Tools Used:</h4>
      <ul>
        <li>Xilinx Vivado Design Suite</li>
        <li>Verilog HDL</li>
        <li>Edge Artix-7 FPGA Board</li>
      </ul>
      
      <div class="project-images">
        <img src="images/fpga_project1.jpeg" alt="FPGA Setup" />
        <img src="images/fpga_project3.jpeg" alt="Verilog Code" />
        <img src="images/fpga_output_image.jpeg" alt="FPGA Output" />
      </div>
    `
  },
  {
    id: 8,
    title: 'Dual Axis Solar Tracker',
    category: 'embedded',
    image: 'academic1.jpg',
    description: 'Real-time solar tracking system using Arduino and LDR sensors with servo motor control.',
    tags: ['Arduino', 'Embedded', 'IoT'],
    github: '',
    details: `
      <h3>📌 Dual Axis Solar Tracker</h3>
      <p>Real-time solar tracking embedded system that intelligently orients solar panels towards the sun.</p>
      
      <h4>🔧 Hardware Components:</h4>
      <ul>
        <li>Arduino Uno – Central controller</li>
        <li>4 LDR Sensors – Sunlight direction detection</li>
        <li>2 Servo Motors – Panel movement</li>
        <li>Solar Panel – Energy harvesting unit</li>
      </ul>
      
      <h4>🏆 Achievements:</h4>
      <ul>
        <li>1st Prize in Galaxy Fest Technical Symposium</li>
        <li>Best Innovation Award at SSM College</li>
        <li>30% efficiency improvement over static panels</li>
      </ul>
    `
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

    // Re-initialize tilt effect for new cards
    if (window.initTilt) {
      setTimeout(window.initTilt, 100);
    }

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = filteredProjects.length > this.displayedProjects ? 'inline-flex' : 'none';
    }
  }

  createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-project-id', project.id);

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x250?text=Project+Image'" />
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        ${project.github ? `
          <a href="${project.github}" target="_blank" class="project-link" onclick="event.stopPropagation()">
            <i class="fab fa-github"></i> View on GitHub
          </a>
        ` : ''}
      </div>
    `;

    card.addEventListener('click', () => this.openModal(project));

    return card;
  }

  setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentFilter = btn.getAttribute('data-filter');
        this.displayedProjects = 6;
        this.renderProjects();

        // Re-trigger animations
        setTimeout(() => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animated');
              }
            });
          }, { threshold: 0.1 });

          document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('animated');
            observer.observe(card);
          });
        }, 100);
      });
    });
  }

  setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
      this.displayedProjects += 6;
      this.renderProjects();
    });
  }

  setupModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => this.closeModal());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = project.title;
    modalBody.innerHTML = project.details;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize project manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProjectManager();
});
