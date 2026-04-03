class ThemeToggle {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const temaToggle = document.querySelector(".tema-toggle");
      const html = document.documentElement;

      // Verifica se o botão existe
      if (!temaToggle) {
        console.warn("Botão .tema-toggle não encontrado");
        return;
      }

      // Carrega preferência salva ou detecta do sistema
      const temaSalvo = localStorage.getItem("tema");
      const prefereTemaClaro = window.matchMedia(
        "(prefers-color-scheme: light)",
      ).matches;
      const temaPadrao = temaSalvo || (prefereTemaClaro ? "light" : "dark");

      html.setAttribute("data-theme", temaPadrao);
      atualizaIcon(temaPadrao);

      // Toggle
      temaToggle.addEventListener("click", () => {
        const atual = html.getAttribute("data-theme");
        const proximo = atual === "light" ? "dark" : "light";

        html.setAttribute("data-theme", proximo);
        localStorage.setItem("tema", proximo);
        atualizaIcon(proximo);
      });

      function atualizaIcon(tema) {
        const icon = temaToggle.querySelector("i");
        if (!icon) return;

        icon.className = tema === "light" ? "fas fa-sun" : "fas fa-moon";
      }
    });
  }
}

export default ThemeToggle;
