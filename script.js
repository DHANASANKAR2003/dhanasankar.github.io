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
  // Scroll-To-Top Button
  // ============================
  const scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
  }

  
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
