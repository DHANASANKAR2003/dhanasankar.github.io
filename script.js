// ============================
// Rotating Typewriter Effect
// ============================
document.addEventListener("DOMContentLoaded", () => {
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
  // Multi-Image Modal Viewer
  // ============================
  const modal = document.createElement("div");
  modal.id = "imgModal";
  modal.style.display = "none";
  modal.innerHTML = `
    <span class="close" style="position:absolute;top:10px;right:20px;font-size:30px;color:white;cursor:pointer;">&times;</span>
    <img class="modal-content" id="imgInModal" style="max-width:90%;max-height:90vh;margin:auto;display:block;animation: zoomIn 0.3s ease;">
    <div id="caption" style="text-align:center;color:white;margin-top:10px;"></div>
    <button id="prevImg" style="position:absolute;top:50%;left:20px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;">&#10094;</button>
    <button id="nextImg" style="position:absolute;top:50%;right:20px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;">&#10095;</button>
  `;
  Object.assign(modal.style, {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 9999,
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column"
  });
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#imgInModal");
  const captionText = modal.querySelector("#caption");
  const closeBtn = modal.querySelector(".close");
  const prevBtn = modal.querySelector("#prevImg");
  const nextBtn = modal.querySelector("#nextImg");

  let galleryImages = [];
  let currentIndex = 0;

  window.openGallery = function (images, caption) {
    if (!images || images.length === 0) return;

    galleryImages = images;
    currentIndex = 0;

    modal.style.display = "flex";
    modalImg.src = galleryImages[currentIndex];
    captionText.textContent = caption;

    prevBtn.style.display = galleryImages.length > 1 ? "block" : "none";
    nextBtn.style.display = galleryImages.length > 1 ? "block" : "none";
  };

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex];
  };

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex];
  };

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
});

// ============================
// Filter Projects (Optional)
// ============================
function filterProjects(type) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    const match = type === "all" || card.dataset.type === type;
    card.style.display = match ? "block" : "none";
  });
}
