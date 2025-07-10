document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Hi, I'm Dhanasankar 🚀",
    "VLSI Enthusiast 🧠",
    "RTL & FPGA Designer 💡",
    "Verilog | Vivado | Icarus 💻",
    "Let's build silicon together!"
  ];

  const scrollText = document.getElementById("scrollText");
  const fullText = phrases.join("   •   ");
  scrollText.innerText = (fullText + "   •   ").repeat(10);
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
