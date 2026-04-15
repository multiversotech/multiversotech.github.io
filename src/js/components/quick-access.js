class AcessoRapido {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => this.init());
  }

  init() {
    this.html = document.documentElement;
    this.container = document.querySelector(".acesso-rapido");

    if (!this.container) {
      console.warn("Componente .acesso-rapido não encontrado");
      return;
    }

    this.toggleBtn = this.container.querySelector(".dropdown-toggle");
    this.dropdownMenu = this.container.querySelector(".dropdown-menu");

    this.initDropdown();
    this.initFontSize();
    this.initLetterSpacing();
    this.initLineHeight();
    this.initContrast();
    this.restoreSettings();
  }

  // --- Dropdown ---

  initDropdown() {
    if (!this.toggleBtn || !this.dropdownMenu) return;

    this.toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = this.toggleBtn.getAttribute("aria-expanded") === "true";
      this.setDropdown(!isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.setDropdown(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.setDropdown(false);
    });
  }

  setDropdown(open) {
    this.toggleBtn.setAttribute("aria-expanded", String(open));
    this.dropdownMenu.classList.toggle("show", open);
  }
}

export default AcessoRapido;
