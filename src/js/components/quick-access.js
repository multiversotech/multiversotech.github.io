class AcessoRapido {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const dropdownBtn = document.querySelector(
        ".acesso-rapido .dropdown-toggle",
      );
      const dropdownMenu = document.getElementById("acessoRapidoMenu");

      if (!dropdownBtn || !dropdownMenu) {
        console.warn(
          "Elementos do acesso-rápido (.dropdown-toggle ou #acessoRapidoMenu) não encontrados",
        );
        return;
      }

      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = dropdownMenu.classList.toggle("is-open");
        dropdownBtn.setAttribute("aria-expanded", String(open));
      });

      this._closeHandler = (e) => {
        if (!e.target.closest(".acesso-rapido")) {
          dropdownMenu.classList.remove("is-open");
          dropdownBtn.setAttribute("aria-expanded", "false");
        }
      };

      document.addEventListener("click", this._closeHandler);
    });
  }
}

export default AcessoRapido;
