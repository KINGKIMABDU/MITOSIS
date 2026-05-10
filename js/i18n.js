const i18n = {
  de: {
    intro_pre: "Biologie · Zellbiologie",
    intro_main: "Die Mitose",
    intro_sub: "Zellsimulation · Visualisiert",
    intro_btn: "Simulation starten →",
    app_tb_logo: "DIE MITOSE",
    app_tb_phase: "Phase",
    app_legend: "Legende",
    app_reset: "↺ RESET",
    app_auto_start: "▶ START",
    app_auto_pause: "⏸ PAUSE",
    app_facts: "Schlüsselprozesse",
    aria_prev: "Vorherige Phase",
    aria_next: "Nächste Phase",
    aria_auto: "Auto-Play umschalten",
    aria_reset: "Simulation zurücksetzen",
    ct_animal: "Tierzelle",
    ct_human: "Menschenzelle",
    ct_plant: "Pflanzenzelle",
    tl_phases: ["Interphase", "Prophase", "Prometaphase", "Metaphase", "Anaphase", "Telophase", "Cytokinese"],
    canvas_g1: "G1", canvas_s: "S", canvas_g2: "G2",
    canvas_dna: "DNA-Replikation",
    canvas_nucleus: "Zellkern",
    canvas_equator: "Äquatorialebene",
    canvas_checkpoint: "M-Checkpoint ✓",
    canvas_ana_a: "Anaphase A",
    canvas_ana_b: "Anaphase B (Elongation)",
    canvas_daughter_1: "Tochterzelle 1",
    canvas_daughter_2: "Tochterzelle 2",
    canvas_human_46: "Mensch: 46 Chromosomen (2 × 23)",
    canvas_cleavage: "Cleavage Furrow: Aktin/Myosin-Ring",
    canvas_plant_1: "Tochterzelle 1 (Pflanze)",
    canvas_plant_2: "Tochterzelle 2 (Pflanze)",
    canvas_cellplate: "Zellplatte → neue Zellwand"
  },
  en: {
    intro_pre: "Biology · Cell Biology",
    intro_main: "Mitosis",
    intro_sub: "Cell Simulation · Visualized",
    intro_btn: "Start Simulation →",
    app_tb_logo: "MITOSIS",
    app_tb_phase: "Phase",
    app_legend: "Legend",
    app_reset: "↺ RESET",
    app_auto_start: "▶ START",
    app_auto_pause: "⏸ PAUSE",
    app_facts: "Key Processes",
    aria_prev: "Previous Phase",
    aria_next: "Next Phase",
    aria_auto: "Toggle Auto-Play",
    aria_reset: "Reset Simulation",
    ct_animal: "Animal Cell",
    ct_human: "Human Cell",
    ct_plant: "Plant Cell",
    tl_phases: ["Interphase", "Prophase", "Prometaphase", "Metaphase", "Anaphase", "Telophase", "Cytokinesis"],
    canvas_g1: "G1", canvas_s: "S", canvas_g2: "G2",
    canvas_dna: "DNA Replication",
    canvas_nucleus: "Nucleus",
    canvas_equator: "Equatorial Plane",
    canvas_checkpoint: "M-Checkpoint ✓",
    canvas_ana_a: "Anaphase A",
    canvas_ana_b: "Anaphase B (Elongation)",
    canvas_daughter_1: "Daughter Cell 1",
    canvas_daughter_2: "Daughter Cell 2",
    canvas_human_46: "Human: 46 Chromosomes (2 × 23)",
    canvas_cleavage: "Cleavage Furrow: Actin/Myosin Ring",
    canvas_plant_1: "Daughter Cell 1 (Plant)",
    canvas_plant_2: "Daughter Cell 2 (Plant)",
    canvas_cellplate: "Cell Plate → New Cell Wall"
  }
};

let currentLang = 'de';

function t(key) {
  return i18n[currentLang][key] || key;
}

function switchLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  document.querySelector('.pre-title').textContent = t('intro_pre');
  document.querySelector('.main-title').textContent = t('intro_main');
  document.querySelector('.sub-title').textContent = t('intro_sub');
  document.getElementById('start-btn').textContent = t('intro_btn');
  document.querySelector('.tb-logo').textContent = t('app_tb_logo');
  document.getElementById('reset-btn').innerHTML = t('app_reset');
  document.getElementById('auto-btn').innerHTML = isPlaying ? t('app_auto_pause') : t('app_auto_start');
  document.querySelector('.facts-head').textContent = t('app_facts');
  
  document.getElementById('nav-p').setAttribute('aria-label', t('aria_prev'));
  document.getElementById('nav-n').setAttribute('aria-label', t('aria_next'));
  document.getElementById('auto-btn').setAttribute('aria-label', t('aria_auto'));
  document.getElementById('reset-btn').setAttribute('aria-label', t('aria_reset'));
  
  const tls = document.querySelectorAll('.tlname');
  tls.forEach((el, idx) => {
    el.textContent = t('tl_phases')[idx];
  });

  document.querySelector('.ct-btn[data-type="0"]').textContent = t('ct_animal');
  document.querySelector('.ct-btn[data-type="1"]').textContent = t('ct_human');
  document.querySelector('.ct-btn[data-type="2"]').textContent = t('ct_plant');
  
  if (typeof cur !== 'undefined' && cur >= 0) {
    updatePhaseContent(cur);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI with the current language
  switchLang(currentLang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchLang(e.target.dataset.lang);
    });
  });
});
