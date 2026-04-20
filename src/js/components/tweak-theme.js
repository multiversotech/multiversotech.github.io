class ThemeTweaker {
  constructor() {
    const TWEAK_DEFAULTS = {
      theme: "dark",
      primaryHue: 285,
      auroraIntensity: 70,
      stars: true,
      cardStyle: "glass",
    };

    function applyTweaks(t) {
      document.documentElement.setAttribute('data-theme', t.theme);
      document.documentElement.style.setProperty('--mvt-primary-hue', t.primaryHue);
      document.documentElement.style.setProperty('--mvt-aurora-intensity', (t.auroraIntensity / 100));
      document.documentElement.setAttribute('data-stars', t.stars ? 'on' : 'off');
      document.documentElement.setAttribute('data-cards', t.cardStyle);
    }
    applyTweaks(TWEAK_DEFAULTS);

    // ========== TWEAKS (edit mode) ==========
    const state = { ...TWEAK_DEFAULTS };
    const panel = document.getElementById('tweaksPanel');
    const fab = document.getElementById('tweaksFab')

    function openPanel() { panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); fab.classList.add('is-open'); }
    function closePanel() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.classList.remove('is-open'); }

    fab.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());

    window.addEventListener('message', (e) => {
      if (e.data?.type === '__activate_edit_mode') openPanel();
      if (e.data?.type === '__deactivate_edit_mode') closePanel();
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');


    document.getElementById('tweaksClose').onclick = () => {
      closePanel();
      window.parent.postMessage({ type: '__deactivate_edit_mode' }, '*');
    };

    function persist(patch) {
      Object.assign(state, patch);
      applyTweaks(state);
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
    }

    document.querySelectorAll('[data-theme-opt]').forEach(b => b.onclick = () => {
      document.querySelectorAll('[data-theme-opt]').forEach(x => x.classList.toggle('is-active', x === b));
      persist({ theme: b.dataset.themeOpt });
    });
    document.querySelectorAll('[data-stars-opt]').forEach(b => b.onclick = () => {
      document.querySelectorAll('[data-stars-opt]').forEach(x => x.classList.toggle('is-active', x === b));
      persist({ stars: b.dataset.starsOpt === 'on' });
    });
    document.querySelectorAll('[data-cards-opt]').forEach(b => b.onclick = () => {
      document.querySelectorAll('[data-cards-opt]').forEach(x => x.classList.toggle('is-active', x === b));
      persist({ cardStyle: b.dataset.cardsOpt });
    });
    document.getElementById('hueSlider').oninput = (e) => {
      document.getElementById('hueVal').textContent = e.target.value;
      persist({ primaryHue: +e.target.value });
    };
    document.getElementById('auroraSlider').oninput = (e) => {
      document.getElementById('auroraVal').textContent = e.target.value;
      persist({ auroraIntensity: +e.target.value });
    };
  }
}
export default ThemeTweaker;
