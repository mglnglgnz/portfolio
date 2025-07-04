document.addEventListener("DOMContentLoaded", () => {
  // Efecto Scramble
  const lines = [
    { el: document.getElementById("line1"), text: "MIGUEL" },
    { el: document.getElementById("line2"), text: "ANGEL" },
    { el: document.getElementById("line3"), text: "GONZALEZ" },
    { el: document.getElementById("line4"), text: "MEJIA" }
  ];
  const chars = "!<>-_\\/[]{}—=+*^?#->________";
  function scramble(target, finalText, delay = 333) {
    let index = 0;
    function update() {
      let output = "";
      for (let i = 0; i < finalText.length; i++) {
        if (i < index) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      target.textContent = output;
      if (index >= finalText.length) {
        target.setAttribute("data-text", finalText);
      } else {
        index++;
        setTimeout(update, delay);
      }
    }
    update();
  }
  lines.forEach((line, i) => {
    setTimeout(() => scramble(line.el, line.text), i * 777);
  });

  // Slides narrativos
  const columnasContainer = document.getElementById('columnasContainer');
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  document.querySelectorAll('.nextBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      slides[currentSlide].classList.remove('active');
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      slides[currentSlide].classList.add('active');

      // 👇 SOLO cuando pasas a slide-2, carga tabla si no existe
      if (slides[currentSlide].id === 'slide-2' && columnasContainer.childElementCount === 0) {
        fetch('columnas.html')
          .then(response => response.text())
          .then(html => {
            columnasContainer.innerHTML = html;
          });
      }
    });
  });
});
