class AcessoRapido {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const dropdownBtn = document.querySelector(
        ".acesso-rapido .mvt-dropdown-toggle",
      );
      const dropdownMenu = document.getElementById("acessoRapido");

      // Verifica se o botão existe
      if (!dropdownBtn) {
        console.warn("Botão .acesso-rapido .mvt-dropdown-toggle não encontrado");
        return;
      }

      dropdownBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = dropdownMenu.classList.toggle("is-open");
        dropdownBtn.setAttribute("aria-expanded", open);
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".acesso-rapido"))
          dropdownMenu?.classList.remove("is-open");
      });
    });
  }
}

export default AcessoRapido;
