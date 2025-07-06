document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div");
  modal.id = "imgModal";
  modal.innerHTML = '<span class="close">&times;</span><img class="modal-content" id="imgInModal"><div id="caption"></div>';
  document.body.appendChild(modal);

  const modalImg = document.getElementById("imgInModal");
  const captionText = document.getElementById("caption");

  document.querySelectorAll(".project-card img").forEach(img => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };
  });

  document.querySelector(".close").onclick = function () {
    modal.style.display = "none";
  };
});
