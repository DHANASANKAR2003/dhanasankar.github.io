// ============================
// Modal for Image View
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // Create modal container
  const modal = document.createElement("div");
  modal.id = "imgModal";
  modal.style.display = "none";
  modal.innerHTML = `
    <span class="close" style="position:absolute;top:10px;right:20px;font-size:30px;color:white;cursor:pointer;">&times;</span>
    <img class="modal-content" id="imgInModal" style="max-width:90%;max-height:90vh;margin:auto;display:block;">
    <div id="caption" style="text-align:center;color:white;margin-top:10px;"></div>
  `;
  Object.assign(modal.style, {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  });
  modal.style.display = "none";
  document.body.appendChild(modal);

  const modalImg = document.getElementById("imgInModal");
  const captionText = document.getElementById("caption");
  const closeBtn = modal.querySelector(".close");

  // Click on image opens modal
  document.querySelectorAll(".project-card img").forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      captionText.textContent = img.alt;
    });
  });

  // Close modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // ESC key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });
});

// ============================
// Filter Projects
// ============================
function filterProjects(type) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    const match = type === "all" || card.dataset.type === type;
    card.style.display = match ? "block" : "none";
  });
}

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
        speed = 500;
      }
    } else {
      typewriter.textContent = currentPhrase.substring(0, letterIndex++);
      speed = 100;
      if (letterIndex > currentPhrase.length) {
        isDeleting = true;
        speed = 2000; // Pause before deleting
      }
    }
    setTimeout(typeLoop, speed);
  }

  if (typewriter) {
    typeLoop();
  }
});

