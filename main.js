document.addEventListener("DOMContentLoaded", () => {
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
    setTimeout(() => {
      scramble(line.el, line.text);
    }, i * 777);
  });

  gsap.registerPlugin(ScrollTrigger);

  const showBtn = document.getElementById("showGraphics");
  const section = document.getElementById("graphicsSection");

  showBtn.addEventListener("click", () => {
    if (section.classList.contains("grid")) {
      // Si ya está abierto, se cierra
      section.classList.remove("grid");
      showBtn.textContent = "Ver Gráficos";
    } else {
      // Si está cerrado, se abre
      if (!section.hasChildNodes()) {
        const graphics = [
          {
            title: "Top 5 Ciudades con más envíos",
            src: "graphics_interactives/top5_envios_por_ciudad.html"
          },
          {
            title: "Violinplot Prioridad de Envío",
            src: "graphics_interactives/duracion_prioridad_violin.html"
          },
          {
            title: "Boxplot Prioridad de Envío",
            src: "graphics_interactives/duracion_prioridad.html"
          },
          {
            title: "Duración por método de envío",
            src: "graphics_interactives/duracion_metodo_envio.html"
          }
        ];

        graphics.forEach(g => {
          const card = document.createElement("div");
          card.className = "card";
          const h2 = document.createElement("h2");
          h2.textContent = g.title;
          const iframe = document.createElement("iframe");
          iframe.src = g.src;
          iframe.loading = "lazy";
          card.appendChild(h2);
          card.appendChild(iframe);
          section.appendChild(card);

          gsap.from(card, {
            opacity: 0,
            y: 90,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }

      section.classList.add("grid");
      section.scrollIntoView({ behavior: "smooth" });
      showBtn.textContent = "Cerrar Gráficos";
    }
  });
});
