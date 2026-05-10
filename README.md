# Die Mitose — Interaktive Zell-Simulation

<div align="center">

![Mitose Banner](https://img.shields.io/badge/Biologie-Zellbiologie-5B6F8A?style=for-the-badge)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-7B5E7B?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-8A9F6B?style=for-the-badge)
![HTML5 Canvas](https://img.shields.io/badge/Canvas-HTML5-8B7355?style=for-the-badge)

**A beautiful, fully interactive browser-based simulation of mitosis — all 7 phases, rendered in real time with HTML5 Canvas.**

Built as a college biology project and made freely available for educational use.

[▶ Live Demo](#) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## 📖 About This Project

This simulation was created as a **college biology project** to visualise the complete process of mitosis — the mechanism by which eukaryotic cells divide to produce two genetically identical daughter cells. Every phase is scientifically reviewed, animated in real time on an HTML5 Canvas, and accompanied by bilingual (English and German) explanations and key facts.

It is provided here for **free educational use** — students, teachers, and curious people are welcome to run it and learn from it. All source code and content remain the exclusive intellectual property of the author (see [License](#-license)).

---

## ✨ Features

- **7 fully animated phases** — Interphase, Prophase, Prometaphase, Metaphase, Anaphase, Telophase, Cytokinesis
- **Real-time Canvas rendering** — smooth 60 fps, zero libraries or build tools required
- **Bilingual Support** — full interface and educational content available in both English and German
- **Mobile Responsive** — fully functional and optimised for smaller screens and touch devices
- **Progressive fact highlighting** — key facts light up in the sidebar as the animation advances
- **Cell type switcher** — Cytokinesis renders Tierzelle, Menschenzelle, and Pflanzenzelle with biologically distinct visuals
- **Auto-play & manual navigation** — arrow keys, number keys 1–7, timeline clicks, or the ▶ START button
- **Zoom support** — scroll wheel to zoom in/out on the canvas
- **Animated phase legend** — per-phase colour key fades in smoothly with each transition
- **Accessibility** — `prefers-reduced-motion` respected; full ARIA roles on all interactive elements
- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript; works fully offline

---

## 🔬 Phases Covered

| # | Phase | What happens |
|---|-------|-------------|
| 0 | **Interphase** | G1 growth → S-phase DNA replication (sister chromatids form) → G2 quality checkpoint |
| 1 | **Prophase** | Chromatin condenses in situ to X-shaped chromosomes; nucleolus disappears; nuclear envelope vesiculates; spindle poles form |
| 2 | **Prometaphase** | Nuclear envelope fully dissolved; spindle fibres attach at kinetochores; chromosomes migrate toward the equatorial plate |
| 3 | **Metaphase** | Chromosomes align at the equatorial plate; M-Checkpoint must pass before Anaphase |
| 4 | **Anaphase** | **A:** centromeres split, sister chromatids separate toward poles (spindle shortens); **B:** poles move apart, cell elongates |
| 5 | **Telophase** | Two nuclei reform; chromosomes decondense to chromatin; spindle disassembles |
| 6 | **Cytokinesis** | Animal/Human: actin–myosin contractile ring → cleavage furrow; Plant: vesicle fusion → cell plate → new cell wall |

---

## 🧬 Scientific Accuracy — Full Review

All seven phase animations were reviewed against standard cell biology references. Here is a phase-by-phase breakdown of what is correct and what was fixed:

### Interphase ✅
The three sub-phases (G1, S, G2) are labelled progressively. DNA replication is shown in the S-phase window only (after 25% progress). The nucleolus is present and visible, consistent with active rRNA production in Interphase.

### Prophase ✅ (fixed)
Chromosomes condense **at their original in-situ positions** — not randomly distributed — which matches real fluorescence microscopy of chromatin territories. The nucleolus disappears during Prophase (correct). The nuclear envelope breaks down into vesicles (correct). Spindle poles only appear from ~20% progress onward, not immediately, matching the gradual nature of spindle assembly.

### Prometaphase ✅
Kinetochore attachment is shown as a separate event from spindle formation (correct — kinetochores are not accessible until the envelope breaks down). Chromosomes migrate from their in-situ positions toward the equatorial plate during this phase.

### Metaphase ✅
The equatorial plate dashed line and the M-Checkpoint label are present. The M-Checkpoint label appears only at >70% phase progress, correctly reflecting that it is a late Metaphase event (the spindle assembly checkpoint must be fully satisfied before Anaphase onset).

### Anaphase ✅ (scientifically fixed)
This phase had the most important scientific correction. Previously, separated chromatids were still drawn as **X-shapes** after centromere splitting — but an X-shape (two sister chromatids joined at a centromere) only exists *before* Anaphase-A. Once the centromere splits, each chromosome is a **single V- or J-shaped chromatid** with the centromere leading toward the pole and the two arms trailing behind. A dedicated `chromSingle()` function now renders this V-shape correctly. The Anaphase-A / Anaphase-B distinction (chromatid movement vs. pole separation/cell elongation) is preserved and labelled.

### Telophase ✅
Both nuclei reform with chromosomes visible inside, then progressively decondense to chromatin (correct sequence). Spindle remnants fade out over time. The cell outline remains elongated from Anaphase, as expected.

### Cytokinesis ✅
Three biologically distinct modes are rendered:
- **Tierzelle** — hourglass constriction driven by an actin–myosin contractile ring (cleavage furrow), correctly tightening from the outside in
- **Menschenzelle** — identical mechanism to Tierzelle (correct — human somatic cells use the same actin–myosin ring); 46 chromosomes (2 × 23) noted
- **Pflanzenzelle** — cell plate forms from vesicle fusion in the centre and grows outward (inside-out direction, correct for phragmoplast-driven plate formation); parent cell wall rendered as a rectangle (correct — plant cells have a rigid wall)

---

## 🚀 Getting Started

No build step, no dependencies, no install required.

```bash
git clone https://github.com/YOUR_USERNAME/die-mitose.git
cd die-mitose
```

Open `index.html` directly in any modern browser, or serve it locally for best results:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

## 📁 Project Structure

```
die-mitose/
├── index.html                          # Entry point
├── LICENSE                             # Proprietary — All Rights Reserved
├── README.md
├── css/
│   ├── main.css                        # Layout, legend, info panel, timeline, credit
│   └── animations.css                  # Keyframe animations
├── js/
│   ├── app.js                          # State management & main render loop
│   ├── simulations/
│   │   └── cell-simulation.js          # Shared drawing primitives
│   ├── animations/
│   │   └── phase-renderer.js           # Per-phase drawing functions
│   └── components/
│       └── ui-controller.js            # Navigation, auto-play, keyboard, ARIA
└── content/
    └── explanations/
        └── phases.js                   # Phase text, facts, legend data (German)
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous phase |
| `→` | Next phase |
| `1` – `7` | Jump directly to phases 0–6 |
| `R` | Reset simulation to Interphase |
| `Space` (focus on START button) | Toggle auto-play |
| Scroll wheel | Zoom in / out |

---

## 🌐 Browser Support

Requires HTML5 Canvas and ES6+. Tested on:

| Browser | Version |
|---------|---------|
| Chrome | 110+ |
| Firefox | 110+ |
| Safari | 16+ |
| Edge | 110+ |

---

## 📄 License

**© 2026 Abdullah Alhariri (킹키마브두) — All Rights Reserved.**

This project is provided for **personal viewing and educational use only**.  
Copying, modifying, distributing, sublicensing, or incorporating any part of this source code into other projects — with or without modification — without express written permission from the author is **strictly prohibited**.

See [`LICENSE`](./LICENSE) for the complete terms.

---

## 🙏 Acknowledgements

Created as a college biology project.  
All simulation logic, phase renderers, animations, and educational content by **Abdullah Alhariri (킹키마브두)**.

---

<div align="center">
<sub>© 2026 Abdullah Alhariri (킹키마브두) · All Rights Reserved · Built with HTML5 Canvas</sub>
</div>
