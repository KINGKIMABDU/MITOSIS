const PHASES_DE = [
  {
    name: 'Interphase', badge: 'Vorbereitung',
    desc: 'Die Zelle bereitet sich auf die Teilung vor. In der G1-Phase wächst sie und verdoppelt ihre Organellen (z. B. Mitochondrien). In der S-Phase wird die Erbinformation (DNA) kopiert, sodass jedes Chromosom aus zwei identischen Hälften besteht. In der G2-Phase prüft die Zelle, ob alles korrekt kopiert wurde.',
    facts: [
      'G1: Zelle wächst stark und verdoppelt alle ihre Organellen',
      'S-Phase: Die DNA wird kopiert, aus einem Chromosom werden zwei identische Hälften (Schwesterchromatiden), die mittig verbunden sind',
      'G2: Die Zelle kontrolliert, ob die DNA-Kopie fehlerfrei ist, und bereitet sich auf die Teilung vor',
      'Die beiden Hälften eines Chromosoms nennt man Schwesterchromatiden, sie sind durch das Zentromer (einen Verdickungspunkt) verbunden'
    ],
    result: 'Die Erbinformation ist jetzt verdoppelt. Jedes Chromosom besteht aus zwei identischen Schwesterchromatiden. Die Zelle ist bereit für die Mitose.'
  },
  {
    name: 'Prophase', badge: 'Phase 1',
    desc: 'Das zuvor locker verteilte Erbgut (Chromatin) verdichtet sich zu sichtbaren X-förmigen Chromosomen. Gleichzeitig bildet sich der Spindelapparat, ein Gerüst aus feinen Eiweißfäden (Mikrotubuli), das später die Chromosomen auseinanderzieht. Die Kernhülle (die Hülle um den Zellkern) beginnt in kleine Bläschen zu zerfallen.',
    facts: [
      'Chromatin (lockeres Erbgut) verdichtet sich zu kompakten X-förmigen Chromosomen, an derselben Stelle, wo sie vorher lagen',
      'Der Nucleolus (Nukleolus, die "Bauwerksstätte" für Ribosomen) verschwindet, die Kernhülle zerfällt in kleine Membranbläschen',
      'Der Spindelapparat aus feinen Eiweißfäden bildet sich schrittweise an den beiden Enden (Polen) der Zelle',
      'In Tier- und Menschenzellen wandern die Zentriolen-Paare (kleine Organellen, die den Spindelapparat organisieren) zu den Zellpolen'
    ],
    result: 'Die Chromosomen sind nun als X-Formen sichtbar. Der Spindelapparat entsteht. Die Kernhülle löst sich komplett auf.'
  },
  {
    name: 'Prometaphase', badge: 'Phase 2',
    desc: 'Die Kernhülle ist nun vollständig verschwunden. Die Eiweißfäden des Spindelapparats dringen in das Zentrum der Zelle ein und heften sich an die Chromosomen. Die Chromosomen werden nun aktiv zur Mitte der Zelle gezogen.',
    facts: [
      'Die Kernhülle ist komplett aufgelöst, der Inhalt des Zellkerns vermischt sich mit dem Zellplasma (Zytoplasma)',
      'Die Spindelfasern dringen in den Bereich vor, wo vorher der Zellkern war',
      'An den Chromosomen befinden sich sogenannte Kinetochore (Anheftungspunkte), dort heften sich die Spindelfasern an',
      'Die Chromosomen werden nun gezielt zur Mittelebene (Äquatorialebene) der Zelle gezogen'
    ],
    result: 'Die Spindelfasern haben die Chromosomen erfasst und bewegen sie zur Mitte der Zelle.'
  },
  {
    name: 'Metaphase', badge: 'Phase 3',
    desc: 'Alle Chromosomen ordnen sich exakt in einer Linie in der Mitte der Zelle an, also wie Perlenschnüre auf einer Leiter. Sie sind jetzt von beiden Seiten an die Spindelfasern angeheftet. Ein Kontrollpunkt (Checkpoint) prüft, ob wirklich alle Chromosomen korrekt sitzen.',
    facts: [
      'Die Chromosomen reihen sich alle in der Mittelebene (Äquatorialebene) der Zelle auf',
      'Jedes Chromosom ist jetzt von beiden Seiten an die Spindelfasern angeheftet',
      'Der M-Checkpoint prüft: Sind alle Chromosomen korrekt angeheftet? Wenn nicht, wird die nächste Phase gestoppt',
      'In dieser Phase sieht man die Chromosomen am besten, ideal für ein Karyogramm (ein sortiertes Foto der Chromosomen eines Menschen)'
    ],
    result: 'Erst wenn der Checkpoint bestätigt, dass alles korrekt ist, startet die nächste Phase. Fehler hier führen zu falscher Verteilung der Erbinformation.'
  },
  {
    name: 'Anaphase',
    badge: 'Phase 4',
    desc: 'Die Verbindung zwischen den beiden Hälften jedes Chromosoms löst sich, und die beiden Hälften (jetzt eigene Chromosomen) wandern zu den entgegengesetzten Enden der Zelle. Die Zelle streckt sich dabei in die Länge.',
    facts: [
      'Anaphase A: Die Zentromere (Verbindungsstellen) trennen sich, die Schwesterchromatiden wandern zu den Zellpolen (die Spindelfasern verkürzen sich dabei)',
      'Die getrennten Hälften sind nun eigenständige Chromosomen, jeder Pol bekommt einen kompletten Satz',
      'Anaphase B: Die Pole der Zelle entfernen sich voneinander, die Zelle wird länger (die Spindelfasern gleiten auseinander)',
      'Ablauf: Erst trennen sich die Chromatiden (A), dann entfernen sich die Pole (B)'
    ],
    result: 'Dieser Schritt kann nicht mehr rückgängig gemacht werden. Wenn sich Chromosomen nicht korrekt trennen, entstehen Zellen mit falscher Chromosomenzahl, das kann Krebs oder Erbkrankheiten verursachen.'
},
  {
    name: 'Telophase', badge: 'Phase 5',
    desc: 'An jedem Ende der Zelle hat sich nun ein vollständiger Satz Chromosomen angesammelt. Um diese Chromosomen herum bilden sich neue Zellkerne. Die Chromosomen entspannen sich dabei wieder und werden zu locker verteiltem Chromatin.',
    facts: [
      'Um jeden Chromosomensatz bildet sich eine neue Kernhülle, es entstehen zwei neue Zellkerne',
      'Die Chromosomen liegen jetzt in den neuen Kernen und entspannen sich wieder zu locker verteiltem Chromatin',
      'Der Spindelapparat wird komplett abgebaut, er hat seine Aufgabe erfüllt',
      'Ergebnis: Zwei genetisch identische Zellkerne in einer einzigen Zelle'
    ],
    result: 'Eine Zelle mit zwei vollständigen Kernen, jetzt fehlt nur noch der letzte Schritt: die Trennung des Zellkörpers.'
  },
  {
    name: 'Cytokinese', badge: 'Phase 6',
    desc: 'Der Zellkörper (Zytoplasma) wird nun geteilt. Wähle unten die Zellart für die spezifische Darstellung, Tier-/Menschenzellen und Pflanzenzellen machen das auf unterschiedliche Weise.',
    facts: [
      'Tier- und Menschenzellen: Ein Ring aus Aktin und Myosin (Kontraktionsproteine) zieht sich zusammen und schnürt die Zelle in der Mitte ein (wie bei einer einengenden Kordel)',
      'Menschen: 46 Chromosomen (2 × 23), der Mechanismus ist identisch zu Tierzellen',
      'Pflanzenzellen: Kleine Bläschen verschmelzen in der Mitte und bilden eine Zellplatte, von innen nach außen wächst eine neue Zellwand',
      'Alle Organellen (Mitochondrien, Ribosomen etc.) werden auf die beiden Tochterzellen verteilt'
    ],
    result: 'Es entstehen zwei genetisch identische Tochterzellen. Die Mitose sichert, dass jede Körperzelle den gleichen Bauplan besitzt.'
  }
];

const PHASES_EN = [
  {
    name: 'Interphase', badge: 'Preparation',
    desc: 'The cell prepares for division. In the G1 phase it grows and duplicates its organelles. In the S phase, the genetic information (DNA) is copied so that each chromosome consists of two identical halves. In the G2 phase, the cell checks if everything was copied correctly.',
    facts: [
      'G1: Cell grows significantly and duplicates its organelles',
      'S phase: DNA is copied, one chromosome becomes two identical halves (sister chromatids) connected in the middle',
      'G2: The cell checks if the DNA copy is error-free and prepares for division',
      'The two halves of a chromosome are called sister chromatids, connected by the centromere'
    ],
    result: 'The genetic information is now duplicated. Each chromosome consists of two identical sister chromatids. The cell is ready for mitosis.'
  },
  {
    name: 'Prophase', badge: 'Phase 1',
    desc: 'The previously loosely distributed genetic material (chromatin) condenses into visible X-shaped chromosomes. At the same time, the spindle apparatus forms, a scaffold of fine protein threads (microtubules) that will later pull the chromosomes apart. The nuclear envelope begins to break down into small vesicles.',
    facts: [
      'Chromatin (loose genetic material) condenses into compact X-shaped chromosomes in the same place where they previously lay',
      'The nucleolus (the "factory" for ribosomes) disappears, the nuclear envelope breaks down into small membrane vesicles',
      'The spindle apparatus of fine protein threads forms gradually at the two ends (poles) of the cell',
      'In animal and human cells, centriole pairs (small organelles organizing the spindle apparatus) migrate to the cell poles'
    ],
    result: 'The chromosomes are now visible as X-shapes. The spindle apparatus is formed. The nuclear envelope dissolves completely.'
  },
  {
    name: 'Prometaphase', badge: 'Phase 2',
    desc: 'The nuclear envelope has now completely disappeared. The protein threads of the spindle apparatus penetrate the center of the cell and attach to the chromosomes. The chromosomes are now actively pulled to the center of the cell.',
    facts: [
      'The nuclear envelope is completely dissolved, the contents of the cell nucleus mix with the cell plasma (cytoplasm)',
      'The spindle fibers advance into the area where the cell nucleus used to be',
      'Chromosomes have so-called kinetochores (attachment points) where the spindle fibers attach',
      'The chromosomes are now deliberately pulled to the middle plane (equatorial plane) of the cell'
    ],
    result: 'The spindle fibers have grasped the chromosomes and move them to the center of the cell.'
  },
  {
    name: 'Metaphase', badge: 'Phase 3',
    desc: 'All chromosomes align exactly in a line in the middle of the cell, like a string of pearls on a ladder. They are now attached to the spindle fibers from both sides. A checkpoint verifies whether all chromosomes are truly seated correctly.',
    facts: [
      'The chromosomes align exactly in the middle plane (equatorial plane) of the cell',
      'Each chromosome is now attached to the spindle fibers from both sides',
      'The M checkpoint checks: Are all chromosomes attached correctly? If not, the next phase is stopped',
      'In this phase the chromosomes are most visible, ideal for a karyogram (an ordered photo of human chromosomes)'
    ],
    result: 'Only when the checkpoint confirms that everything is correct does the next phase start. Errors here lead to an incorrect distribution of genetic information.'
  },
  {
    name: 'Anaphase', badge: 'Phase 4',
    desc: 'This is the most important step: The connection between the two halves of each chromosome breaks, and the two halves (now individual chromosomes) migrate to opposite ends of the cell. The cell elongates in the process.',
    facts: [
      'Anaphase A: The centromeres (connection points) separate, the sister chromatids migrate to the cell poles (spindle fibers shorten)',
      'The separated halves are now independent chromosomes, each pole gets a complete set',
      'Anaphase B: The poles of the cell move apart, the cell gets longer (spindle fibers slide apart)',
      'Process: First the chromatids separate (A), then the poles move apart (B)'
    ],
    result: 'This step cannot be reversed. If chromosomes do not separate correctly, cells with the wrong number of chromosomes are created, which can cause cancer or genetic diseases.'
  },
  {
    name: 'Telophase', badge: 'Phase 5',
    desc: 'A complete set of chromosomes has now accumulated at each end of the cell. New cell nuclei form around these chromosomes. The chromosomes relax again and become loosely distributed chromatin.',
    facts: [
      'A new nuclear envelope forms around each set of chromosomes, creating two new cell nuclei',
      'The chromosomes are now in the new nuclei and relax again into loosely distributed chromatin',
      'The spindle apparatus is completely dismantled, its task is fulfilled',
      'Result: Two genetically identical cell nuclei in a single cell'
    ],
    result: 'A cell with two complete nuclei, now only the last step is missing: the separation of the cell body.'
  },
  {
    name: 'Cytokinesis', badge: 'Phase 6',
    desc: 'The cell body (cytoplasm) is now divided. Select the cell type below for the specific representation; animal/human cells and plant cells do this in different ways.',
    facts: [
      'Animal and human cells: A ring of actin and myosin (contraction proteins) contracts and pinches the cell in the middle (like a tightening cord)',
      'Humans: 46 chromosomes (2 × 23) — the mechanism is identical to animal cells',
      'Plant cells: Small vesicles fuse in the middle and form a cell plate, a new cell wall grows from the inside out',
      'All organelles (mitochondria, ribosomes, etc.) are distributed to the two daughter cells'
    ],
    result: 'Two genetically identical daughter cells are created. Mitosis ensures that every body cell has the same blueprint.'
  }
];

const PHASE_LEGEND_DE = [
  [ // 0: Interphase
    { label: 'Zellmembran', color: '#8A9F6B' },
    { label: 'Zellkern', color: '#7B5E7B' },
    { label: 'Chromatin', color: '#64506D' },
    { label: 'DNA-Replikation (ab 25%)', color: '#5B6F8A' }
  ],
  [ // 1: Prophase
    { label: 'Zellmembran', color: '#8A9F6B' },
    { label: 'Chromosomen (X-Form, in situ)', color: '#64506D' },
    { label: 'Spindelpole (werden)', color: '#8B7355' },
    { label: 'Kernhülle (vesikuliert)', color: '#7B5E7B' }
  ],
  [ // 2: Prometaphase
    { label: 'Zellmembran', color: '#8A9F6B' },
    { label: 'Kernhüllen-Vesikel', color: '#A082A0' },
    { label: 'Chromosomen (wandernd)', color: '#64506D' },
    { label: 'Spindelfasern', color: '#8B7355' }
  ],
  [ // 3: Metaphase
    { label: 'Zellmembran', color: '#8A9F6B' },
    { label: 'Chromosomen (Äquatorialebene)', color: '#64506D' },
    { label: 'Spindelfasern', color: '#8B7355' },
    { label: 'Spindelpole', color: '#8B7355' }
  ],
  [ // 4: Anaphase
    { label: 'Zellmembran (gestreckt)', color: '#8A9F6B' },
    { label: 'Chromosomen (getrennt) (A)', color: '#64506D' },
    { label: 'Pole entfernen sich (B)', color: '#8B7355' },
    { label: 'Spindelfasern', color: '#8B7355' }
  ],
  [ // 5: Telophase
    { label: 'Zellmembran', color: '#8A9F6B' },
    { label: 'Neue Zellkerne (mit Chromosomen)', color: '#7B5E7B' },
    { label: 'Entspiralisiertes Chromatin', color: '#64506D' },
    { label: 'Spindelreste', color: '#8B7355' }
  ],
  [ // 6: Cytokinesis
    { label: 'Tochterzellen', color: '#C8D2B2' },
    { label: 'Zellkerne', color: '#7B5E7B' },
    { label: 'Cleavage Furrow / Zellplatte', color: '#8B7355' },
    { label: 'Zellmembran', color: '#8A9F6B' }
  ]
];

const PHASE_LEGEND_EN = [
  [ // 0: Interphase
    { label: 'Cell Membrane', color: '#8A9F6B' },
    { label: 'Nucleus', color: '#7B5E7B' },
    { label: 'Chromatin', color: '#64506D' },
    { label: 'DNA Replication (from 25%)', color: '#5B6F8A' }
  ],
  [ // 1: Prophase
    { label: 'Cell Membrane', color: '#8A9F6B' },
    { label: 'Chromosomes (X-shape, in situ)', color: '#64506D' },
    { label: 'Spindle Poles (forming)', color: '#8B7355' },
    { label: 'Nuclear Envelope (vesiculating)', color: '#7B5E7B' }
  ],
  [ // 2: Prometaphase
    { label: 'Cell Membrane', color: '#8A9F6B' },
    { label: 'Nuclear Envelope Vesicles', color: '#A082A0' },
    { label: 'Chromosomes (migrating)', color: '#64506D' },
    { label: 'Spindle Fibers', color: '#8B7355' }
  ],
  [ // 3: Metaphase
    { label: 'Cell Membrane', color: '#8A9F6B' },
    { label: 'Chromosomes (Equatorial Plane)', color: '#64506D' },
    { label: 'Spindle Fibers', color: '#8B7355' },
    { label: 'Spindle Poles', color: '#8B7355' }
  ],
  [ // 4: Anaphase
    { label: 'Cell Membrane (elongated)', color: '#8A9F6B' },
    { label: 'Chromosomes (separated) (A)', color: '#64506D' },
    { label: 'Poles moving apart (B)', color: '#8B7355' },
    { label: 'Spindle Fibers', color: '#8B7355' }
  ],
  [ // 5: Telophase
    { label: 'Cell Membrane', color: '#8A9F6B' },
    { label: 'New Nuclei (with chromosomes)', color: '#7B5E7B' },
    { label: 'Decondensed Chromatin', color: '#64506D' },
    { label: 'Spindle Remnants', color: '#8B7355' }
  ],
  [ // 6: Cytokinesis
    { label: 'Daughter Cells', color: '#C8D2B2' },
    { label: 'Nuclei', color: '#7B5E7B' },
    { label: 'Cleavage Furrow / Cell Plate', color: '#8B7355' },
    { label: 'Cell Membrane', color: '#8A9F6B' }
  ]
];

function getPhaseData(n) {
  return currentLang === 'en' ? PHASES_EN[n] : PHASES_DE[n];
}

function getLegendData(n) {
  return currentLang === 'en' ? PHASE_LEGEND_EN[n] : PHASE_LEGEND_DE[n];
}