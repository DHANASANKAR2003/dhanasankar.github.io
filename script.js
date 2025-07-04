// Typing effect using Typed.js
new Typed(".typed-text", {
  strings: ["Aspiring VLSI Engineer", "FPGA Developer", "RTL Designer"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
});

// Scroll animations
const scrollElements = document.querySelectorAll("[data-animate]");
const scrollInView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight - 100;
};

const animateOnScroll = () => {
  scrollElements.forEach((el) => {
    if (scrollInView(el)) el.classList.add("active");
  });
};
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Radial skills
document.querySelectorAll(".radial-skill").forEach(el => {
  const label = el.dataset.label;
  const percent = el.dataset.percent;
  el.innerHTML = `
    <svg viewBox="0 0 36 36" class="radial-chart">
      <path class="circle-bg"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path class="circle"
        stroke-dasharray="${percent}, 100"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831" />
      <text x="18" y="20.35" class="percentage">${percent}%</text>
    </svg>
    <span>${label}</span>
  `;
});
