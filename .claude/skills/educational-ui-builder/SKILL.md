---
name: educational-ui-builder
version: 1.0.0
description: A skill for creating student-friendly educational UI components with accessibility and responsive design best practices.
created: 2026-05-06
last_modified: 2026-05-06
type: generative
scope: ui-components, educational-interfaces, student-experience, responsive-design
triggers:
  - creating new UI components
  - designing educational interfaces
  - building interactive learning elements
  - modifying existing educational UI
  - creating student-facing layouts
  - implementing responsive educational designs
  - building quiz or assessment interfaces
dependencies: []
conflicts: []
---

# Educational UI Builder Skill

## Purpose

This skill specializes in creating premium, student-friendly interactive educational interfaces. It applies educational design principles, accessibility standards, and pedagogical best practices to every UI component built for the MITOSIS project.

---

## Activation Criteria

Activate this skill when:
- User requests creation of new UI components
- Designing new educational interfaces or pages
- Building interactive learning elements (quizzes, simulations, cards)
- Modifying existing educational UI components
- Creating student-facing layouts or navigation
- Implementing responsive designs for educational content
- Building assessment or progress tracking interfaces

---

## Core Design Principles

### 1. Student-First Design

**Cognitive Load Management:**
- **Minimize choices**: Show 3-5 options max per screen
- **Progressive disclosure**: Don't show everything at once
- **Clear visual hierarchy**: Most important info = largest/most prominent
- **Consistent patterns**: Same interaction = same visual treatment
- **Error prevention**: Make it hard for students to do the "wrong" thing

**Scannable Content:**
```
✅ GOOD STRUCTURE:
┌─────────────────────────────────┐
│  Phase Name (H1, large)        │  ← Clear heading
│  ─────────────────────────      │
│  Key Concept (H2, medium)      │  ← Scannable sections
│  • Bullet point                 │  ← Easy to scan
│  • Bullet point                 │
│                                 │
│  [ Interactive Element ]        │  ← Clear interaction
│                                 │
│  "Did you know?" (callout)      │  ← Supplementary info
└─────────────────────────────────┘
```

### 2. Educational Color Palette

**Semantic Colors (Use CSS Variables):**

```css
:root {
  /* Biological Elements - MUST BE CONSISTENT */
  --bio-chromosome: #e74c3c;      /* Red - chromosomes */
  --bio-chromatid: #c0392b;       /* Dark red - individual chromatids */
  --bio-spindle: #3498db;         /* Blue - spindle fibers */
  --bio-nucleus: #2ecc71;         /* Green - nuclear envelope */
  --bio-cell-membrane: #f39c12;   /* Orange - cell boundary */
  --bio-centrosome: #9b59b6;      /* Purple - centrosomes */
  --bio-kinetochore: #e67e22;     /* Dark orange - kinetochores */
  
  /* Educational UI - Student Friendly */
  --edu-primary: #2980b9;         /* Trust blue - main actions */
  --edu-secondary: #7f8c8d;       /* Neutral gray - secondary actions */
  --edu-success: #27ae60;         /* Green - correct answers */
  --edu-error: #e74c3c;           /* Red - incorrect answers */
  --edu-warning: #f39c12;         /* Amber - cautions */
  --edu-info: #3498db;            /* Blue - informational */
  
  /* Neutral Palette - Clean & Readable */
  --neutral-900: #1a1a2e;        /* Primary text */
  --neutral-800: #2d2d44;        /* Headings */
  --neutral-700: #3d3d5c;        /* Secondary text */
  --neutral-600: #5a5a7a;        /* Muted text */
  --neutral-200: #e8e8f0;        /* Borders */
  --neutral-100: #f0f0f8;        /* Backgrounds */
  --neutral-50: #f8f8fc;         /* Page background */
}
```

### 3. Typography Scale (Educational Readability)

```css
:root {
  /* Educational typography - optimized for reading comprehension */
  --text-xs: 0.75rem;    /* 12px - captions, metadata */
  --text-sm: 0.875rem;    /* 14px - secondary text */
  --text-base: 1rem;      /* 16px - body text (MINIMUM for accessibility) */
  --text-lg: 1.125rem;    /* 18px - emphasized body */
  --text-xl: 1.25rem;     /* 20px - small headings */
  --text-2xl: 1.5rem;     /* 24px - section headings */
  --text-3xl: 1.875rem;   /* 30px - page headings */
  --text-4xl: 2.25rem;    /* 36px - hero headings */
  
  /* Line height for readability */
  --leading-body: 1.6;    /* 160% - optimal for comprehension */
  --leading-heading: 1.3;  /* 130% - tight for headings */
}
```

**Font Stack:**
```css
body {
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  /* Inter is excellent for educational content (clear letterforms) */
}
```

### 4. Component Patterns (Reusable)

#### Phase Card Component
```html
<!-- Phase Card - Used for each mitosis phase explanation -->
<div class="phase-card phase-card--[phase-name]">
  <div class="phase-card__header">
    <h3 class="phase-card__title">[Phase Name]</h3>
    <span class="phase-card__duration">~[X] seconds</span>
  </div>
  <div class="phase-card__visual">
    <!-- Phase-specific illustration/animation -->
  </div>
  <div class="phase-card__content">
    <p class="phase-card__description">[Explanation]</p>
  </div>
  <div class="phase-card__footer">
    <button class="btn btn--primary">Learn More</button>
  </div>
</div>
```

#### Simulation Controls Component
```html
<!-- Simulation Controls - Play, Pause, Reset, Speed -->
<div class="sim-controls">
  <button class="sim-controls__btn sim-controls__btn--play" aria-label="Play simulation">
    <svg><!-- play icon --></svg>
  </button>
  <button class="sim-controls__btn sim-controls__btn--pause" aria-label="Pause simulation">
    <svg><!-- pause icon --></svg>
  </button>
  <button class="sim-controls__btn sim-controls__btn--reset" aria-label="Reset simulation">
    <svg><!-- reset icon --></svg>
  </button>
  <div class="sim-controls__speed">
    <label for="speed-control">Speed:</label>
    <input type="range" id="speed-control" min="0.25" max="3" step="0.25" value="1">
  </div>
</div>
```

#### Quiz Component
```html
<!-- Quiz Question - Multi-choice with immediate feedback -->
<div class="quiz-question">
  <h4 class="quiz-question__text">[Question Text]</h4>
  <div class="quiz-question__options">
    <label class="quiz-option">
      <input type="radio" name="quiz-[n]" value="[a|b|c|d]">
      <span class="quiz-option__text">[Option Text]</span>
      <span class="quiz-option__feedback" aria-live="polite"></span>
    </label>
    <!-- Repeat for each option -->
  </div>
  <div class="quiz-question__hint" hidden>
    <p>[Hint text - shown on request]</p>
  </div>
</div>
```

### 5. Responsive Patterns

**Mobile-First Approach:**

```css
/* Base: Mobile (< 768px) */
.phase-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column */
  gap: 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .phase-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .phase-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }
}
```

**Touch-Friendly Interactions:**
```css
/* Minimum touch target: 44x44px (Apple/Material guidelines) */
.btn,
.sim-controls__btn,
.quiz-option {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px; /* Comfortable touch area */
}

/* Larger touch targets on mobile */
@media (max-width: 767px) {
  .sim-controls__btn {
    min-height: 48px;
    min-width: 48px;
  }
}
```

### 6. Accessibility Standards (WCAG 2.1 AA)

**Mandatory Requirements:**

```css
/* Color contrast - 4.5:1 for normal text, 3:1 for large text */
.text-body { color: var(--neutral-900); } /* On white: 16.6:1 ✅ */
.text-muted { color: var(--neutral-600); } /* On white: 5.9:1 ✅ */

/* Focus indicators - NEVER remove outline without replacement */
:focus {
  outline: 3px solid var(--edu-primary);
  outline-offset: 2px;
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**ARIA Patterns:**
```html
<!-- Simulation with live region for screen readers -->
<div class="simulation" role="img" aria-label="Mitosis simulation">
  <div class="simulation__viewport">
    <!-- Animation here -->
  </div>
  <div class="simulation__status" aria-live="polite" aria-atomic="true">
    Currently in: Prophase
  </div>
</div>

<!-- Expandable explanation -->
<button aria-expanded="false" aria-controls="details-1" class="expandable__trigger">
  Learn More About Prophase
</button>
<div id="details-1" class="expandable__content" hidden>
  <p>Detailed explanation here...</p>
</div>
```

---

## Component Creation Protocol

When user requests a new UI component:

### Phase 1: UNDERSTAND
```
1. What is the educational purpose of this component?
2. Who is the target audience (student level)?
3. What action should the student take?
4. How does this fit into the learning flow?
5. What existing components is this similar to?
```

### Phase 2: DESIGN
```
1. Sketch the component structure (HTML)
2. Define the CSS with design tokens (variables)
3. Add responsive breakpoints
4. Include accessibility attributes
5. Plan interaction states (hover, focus, active, disabled)
```

### Phase 3: BUILD
```html
<!-- Component template with BEM naming -->
<div class="[block] [block]--[modifier]">
  <div class="[block]__element">
    <span class="[block]__element--[state]">Content</span>
  </div>
</div>
```

```css
/* Component styles using design tokens */
.[block] {
  /* Layout */
  display: flex;
  gap: var(--space-md);
  
  /* Colors */
  background: var(--neutral-50);
  color: var(--neutral-900);
  
  /* Typography */
  font-size: var(--text-base);
  line-height: var(--leading-body);
  
  /* Accessibility */
  border: 2px solid var(--neutral-200);
  border-radius: 8px;
}

.[block]__element {
  /* Component-specific styles */
}

/* States */
.[block]:hover { /* ... */ }
.[block]:focus-within { /* ... */ }
.[block]--active { /* ... */ }
.[block]--disabled { /* opacity: 0.5; pointer-events: none; */ }

/* Responsive */
@media (max-width: 767px) { /* ... */ }
```

### Phase 4: ENHANCE
```
1. Add smooth transitions (refer to animation-consistency skill)
2. Include loading states if applicable
3. Add error states with helpful messages
4. Include success states with positive reinforcement
5. Test keyboard navigation
```

### Phase 5: VERIFY
```
□ Educational purpose is clear
□ Component is accessible (WCAG 2.1 AA)
□ Responsive at all breakpoints
□ Uses design tokens (no hardcoded colors/sizes)
□ BEM naming convention followed
□ Smooth animations (transform/opacity only)
□ Touch-friendly (min 44x44px targets)
□ Screen reader tested (aria labels, live regions)
□ Works without JavaScript (progressive enhancement)
```

---

## Premium UI Patterns

### Glassmorphism Card (for phase explanations)
```css
.phase-card--premium {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
```

### Animated Progress Indicator
```css
.progress-bar {
  height: 6px;
  background: var(--neutral-200);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--edu-primary);
  transform: scaleX(var(--progress, 0));
  transform-origin: left;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tooltip (for biological terms)
```css
.bio-tooltip {
  position: relative;
  border-bottom: 2px dotted var(--edu-info);
  cursor: help;
}

.bio-tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: var(--neutral-900);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: var(--text-sm);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 150ms ease;
  pointer-events: none;
}

.bio-tooltip:hover::after,
.bio-tooltip:focus::after {
  opacity: 1;
}
```

---

## Output Format

When this skill is active:

```
🎓 EDUCATIONAL UI BUILDER ACTIVE

Component: [Component Name]
Purpose: [Educational goal]
Audience: [Student level]

STRUCTURE:
[HTML skeleton]

STYLES:
[CSS with design tokens]

ACCESSIBILITY:
✓ ARIA labels present
✓ Keyboard navigable
✓ Screen reader friendly
✓ Color contrast 4.5:1+

RESPONSIVE:
✓ Mobile (< 768px): [Layout]
✓ Tablet (768px+): [Layout]
✓ Desktop (1024px+): [Layout]

ANIMATION:
✓ Using transform/opacity only
✓ 300ms cubic-bezier(0.4, 0, 0.2, 1)
✓ Reduce-motion supported
```

---

## Integration with Other Skills

- **biology-education-quality**: Get accurate content for UI components
- **animation-consistency**: Ensure UI animations are smooth
- **simulation-safety**: Coordinate on simulation UI elements
- **component-reuse-enforcer**: Check if component already exists
- **safe-refactor-protocol**: Use when modifying existing UI
- **regression-verifier**: Verify UI changes don't break layouts

---

## Skill Maintenance

Update this skill when:
- New educational design patterns emerge
- Accessibility standards update
- Browser support changes for CSS features
- User feedback indicates UX issues
- New component types are needed

Version history tracked in `/.claude/skill-evolution-log.md`.
