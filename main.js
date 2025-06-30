const lines = [
  { el: document.getElementById("line1"), text: "MIGUEL" },
  { el: document.getElementById("line2"), text: "ANGEL" },
  { el: document.getElementById("line3"), text: "GONZALEZ" },
  { el: document.getElementById("line4"), text: "MEJIA" }
];

const chars = "!<>-_\\/[]{}—=+*^?#________";

function scramble(target, finalText, delay = 111) {
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
      // 👉 Aquí se asegura de fijar el data-text final cuando termina
      target.setAttribute("data-text", finalText);
    } else {
      index++;
      setTimeout(update, delay);
    }
  }

  update();
}

// Animar cada línea en cascada
lines.forEach((line, i) => {
  setTimeout(() => {
    scramble(line.el, line.text);
  }, i * 777);
});
