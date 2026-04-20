class MenuToggle {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => this.init());
  }

  init() {
    this.menuToggle = document.querySelector(".menu-toggle");
    this.navMenu = this.getNavMenu();

    if (!this.menuToggle || !this.navMenu) {
      console.warn("Elementos do menu mobile não encontrados");
      return;
    }

    this.setMenu(false);
    this.initMenu();
  }

  getNavMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const controlledMenuId = menuToggle?.getAttribute("aria-controls");

    if (controlledMenuId) {
      const controlledMenu = document.getElementById(controlledMenuId);

      if (controlledMenu) {
        return controlledMenu;
      }
    }

    return document.querySelector(".mtv-nav, #navbarNav, .mvt-nav-item");
  }

  initMenu() {
    this.menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = this.menuToggle.getAttribute("aria-expanded") === "true";
      this.setMenu(!isOpen);
    });

    this.navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => this.setMenu(false));
    });

    document.addEventListener("click", (event) => {
      const clickDentroDoMenu = this.navMenu.contains(event.target);
      const clickNoBotao = this.menuToggle.contains(event.target);

      if (!clickDentroDoMenu && !clickNoBotao) {
        this.setMenu(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.setMenu(false);
      }
    });
  }

  setMenu(isOpen) {
    this.menuToggle.classList.toggle("active", isOpen);
    this.navMenu.classList.toggle("active", isOpen);
    this.navMenu.classList.toggle("show", isOpen);
    this.menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  mensagemConsoleConfiguracao() {
    console.log(
      "%c🚀 MULTIVERSO TECH - DEVELOPER CONSOLE",
      "color: #6366f1; font-size: 24px; font-weight: bold;",
    );
    console.log(`Olá, developer! 👋

Este projeto é open source e feito com ❤️ pela comunidade.
Quer contribuir? Acesse: https://github.com/multiversotech/multiversotech.github.io

Tecnologias usadas:
• HTML5 Semântico
• CSS3 com Custom Properties
• JavaScript Modular
• GitHub Pages

Happy coding! 🎯`);
  }
}

export default MenuToggle;
