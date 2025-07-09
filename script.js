document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // Rotating Typewriter Effect
  // ============================
  const phrases = [
    "Hi, I'm Dhanasankar 🚀",
    "VLSI Enthusiast 🧠",
    "RTL & FPGA Designer 💡",
    "Verilog | Vivado | Icarus 💻",
    "Let's build silicon together!"
  ];

  const typewriter = document.querySelector(".typewriter");
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let speed = 100;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typewriter.textContent = currentPhrase.substring(0, letterIndex--);
      speed = 50;
      if (letterIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }
    } else {
      typewriter.textContent = currentPhrase.substring(0, letterIndex++);
      speed = 100;
      if (letterIndex > currentPhrase.length) {
        isDeleting = true;
        speed = 2000;
      }
    }
    setTimeout(typeLoop, speed);
  }

  if (typewriter) typeLoop();

  // ============================
  // Modal Image Viewer
  // ============================
  const imgModal = document.createElement("div");
  imgModal.id = "imgModal";
  imgModal.style.display = "none";
  imgModal.innerHTML = `
    <span class="img-close" style="position:absolute;top:10px;right:20px;font-size:30px;color:white;cursor:pointer;">&times;</span>
    <img class="modal-content" id="imgInModal" style="max-width:90vw;max-height:90vh;margin:auto;display:block;">
    <div id="caption" style="text-align:center;color:white;margin-top:10px;"></div>
  `;
  Object.assign(imgModal.style, {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  });
  document.body.appendChild(imgModal);

  const imgModalImg = imgModal.querySelector("#imgInModal");
  const imgCaption = imgModal.querySelector("#caption");
  const imgCloseBtn = imgModal.querySelector(".img-close");

  document.querySelectorAll(".project-card img").forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      imgModal.style.display = "flex";
      imgModalImg.src = img.src;
      imgCaption.textContent = img.alt;
    });
  });

  imgCloseBtn.onclick = () => (imgModal.style.display = "none");
  imgModal.addEventListener("click", e => {
    if (e.target === imgModal) imgModal.style.display = "none";
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") imgModal.style.display = "none";
  });

  // ============================
  // Scroll-To-Top Button
  // ============================
  const scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
  }

  // ============================
  // Project Card Modal
  // ============================
  const projectModal = document.createElement("div");
  projectModal.id = "projectModal";
  projectModal.style.display = "none";
  projectModal.innerHTML = `
    <span class="project-close" style="position:absolute;top:10px;right:20px;font-size:30px;color:white;cursor:pointer;">&times;</span>
    <div class="modal-box" style="max-width:90vw;max-height:85vh;overflow:auto;background:#111;padding:20px;border-radius:10px;color:white;">
      <h2 id="modalTitle" style="text-align:center;"></h2>
      <div id="modalContent" style="margin-top:20px;font-size:1em;"></div>
    </div>
  `;
  Object.assign(projectModal.style, {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center"
  });
  document.body.appendChild(projectModal);

  const projectTitle = projectModal.querySelector("#modalTitle");
  const projectContent = projectModal.querySelector("#modalContent");
  const projectCloseBtn = projectModal.querySelector(".project-close");

  document.querySelectorAll(".project-card").forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      projectModal.style.display = "flex";
      projectTitle.textContent = card.dataset.title || "Project Details";
      projectContent.innerHTML = card.dataset.content || "No content provided.";
    });
  });

  projectCloseBtn.onclick = () => (projectModal.style.display = "none");
  projectModal.addEventListener("click", e => {
    if (e.target === projectModal) projectModal.style.display = "none";
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") projectModal.style.display = "none";
  });

  // ============================
  // Project Card Scroll Animation
  // ============================
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

// ============================
// Project Filter Function
// ============================
function filterProjects(type) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    const match = type === "all" || card.dataset.type === type;
    card.style.display = match ? "block" : "none";
  });
}
