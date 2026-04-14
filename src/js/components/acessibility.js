class Acessibility {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => this.init());
  }

  init() {
    this.html = document.documentElement;
    this.container = document.querySelector(".acessibilidade");

    if (!this.container) {
      console.warn("Componente .acessibilidade não encontrado");
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

  // --- Tamanho da fonte ---

  initFontSize() {
    const slider = document.getElementById("fontSizeSlider");
    const display = document.getElementById("fontSizeValue");
    if (!slider) return;

    if (display) display.textContent = slider.value + "x";

    slider.addEventListener("input", () => {
      const val = slider.value;
      this.applyFontSize(val);
      if (display) display.textContent = val + "x";
      localStorage.setItem("a11y-font-size", val);
    });
  }

  applyFontSize(val) {
    this.html.style.fontSize = val + "em";
  }

  // --- Espaçamento entre letras ---

  initLetterSpacing() {
    const slider = document.getElementById("letterSpacingSlider");
    const display = document.getElementById("letterSpacingValue");
    if (!slider) return;

    if (display) display.textContent = slider.value + "px";

    slider.addEventListener("input", () => {
      const val = slider.value;
      this.applyLetterSpacing(val);
      if (display) display.textContent = val + "px";
      localStorage.setItem("a11y-letter-spacing", val);
    });
  }

  applyLetterSpacing(val) {
    this.html.style.letterSpacing = val + "px";
  }

  // --- Espaçamento entre linhas ---

  initLineHeight() {
    const slider = document.getElementById("lineHeightSlider");
    const display = document.getElementById("lineHeightValue");
    if (!slider) return;

    if (display) display.textContent = slider.value;

    slider.addEventListener("input", () => {
      const val = slider.value;
      this.applyLineHeight(val);
      if (display) display.textContent = val;
      localStorage.setItem("a11y-line-height", val);
    });
  }

  applyLineHeight(val) {
    this.html.style.lineHeight = val;
  }

  // --- Modo contraste ---

  initContrast() {
    const btnDark = document.getElementById("contrastDark");
    const btnLight = document.getElementById("contrastLight");

    if (btnDark) {
      btnDark.addEventListener("click", () => {
        const next =
          this.html.getAttribute("data-contrast") === "dark" ? "" : "dark";
        this.applyContrast(next);
        localStorage.setItem("a11y-contrast", next);
      });
    }

    if (btnLight) {
      btnLight.addEventListener("click", () => {
        const next =
          this.html.getAttribute("data-contrast") === "light" ? "" : "light";
        this.applyContrast(next);
        localStorage.setItem("a11y-contrast", next);
      });
    }
  }

  applyContrast(val) {
    if (val) {
      this.html.setAttribute("data-contrast", val);
    } else {
      this.html.removeAttribute("data-contrast");
    }
  }

  // --- Restaurar preferências salvas ---

  restoreSettings() {
    const fontSize = localStorage.getItem("a11y-font-size");
    const letterSpacing = localStorage.getItem("a11y-letter-spacing");
    const lineHeight = localStorage.getItem("a11y-line-height");
    const contrast = localStorage.getItem("a11y-contrast");

    if (fontSize) {
      this.applyFontSize(fontSize);
      const slider = document.getElementById("fontSizeSlider");
      const display = document.getElementById("fontSizeValue");
      if (slider) slider.value = fontSize;
      if (display) display.textContent = fontSize + "x";
    }

    if (letterSpacing) {
      this.applyLetterSpacing(letterSpacing);
      const slider = document.getElementById("letterSpacingSlider");
      const display = document.getElementById("letterSpacingValue");
      if (slider) slider.value = letterSpacing;
      if (display) display.textContent = letterSpacing + "px";
    }

    if (lineHeight) {
      this.applyLineHeight(lineHeight);
      const slider = document.getElementById("lineHeightSlider");
      const display = document.getElementById("lineHeightValue");
      if (slider) slider.value = lineHeight;
      if (display) display.textContent = lineHeight;
    }

    if (contrast) {
      this.applyContrast(contrast);
    }
  }
}

export default Acessibility;
