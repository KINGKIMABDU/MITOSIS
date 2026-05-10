---
name: animation-consistency
version: 1.0.0
created: 2026-05-06
last_modified: 2026-05-06
description: Ensures CSS animations and transitions are smooth, consistent, and performant across the project.
type: quality-assurance
scope: css-animations, transitions, keyframes, performance, visual-consistency
triggers:
  - modifying CSS animations or transitions
  - changing keyframe definitions
  - editing animation-timing-function
  - adjusting animation-duration
  - modifying transform, opacity, or position animations
  - changing animation-delay or stagger timings
  - editing GPU-accelerated animation properties
dependencies: []
conflicts: []
---

# Animation Consistency Skill

## Purpose

This skill ensures all animations in the MITOSIS project remain smooth, visually consistent, and performant. It prevents janky animations, maintains visual cohesion across components, and enforces best practices for web animations in educational contexts.

---

## Activation Criteria

Activate this skill when:
- User requests changes to CSS animations or transitions
- Modifying `@keyframes` definitions
- Changing `animation-timing-function` or `transition-timing-function`
- Adjusting `animation-duration` or `transition-duration`
- Editing properties being animated (transform, opacity, left, top, etc.)
- Modifying animation delays or stagger timings
- Changing GPU-accelerated animation approaches
- Adding new animated components
- Modifying responsive animation behavior

---

## Core Responsibilities

### 1. Animation Smoothness (60fps Standard)

**Golden Rule: ONLY animate `transform` and `opacity`**

```css
/* ✅ GOOD - GPU accelerated, smooth */
.animated-element {
  transform: translateX(100px);
  transition: transform 0.3s ease;
}

/* ✅ GOOD - GPU accelerated, smooth */
.fade-in {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* ❌ BAD - triggers layout, causes jank */
.janky {
  left: 100px;
  transition: left 0.3s ease; /* Triggers layout recalc */
}

/* ❌ BAD - triggers paint, causes jank */
.expensive {
  width: 200px;
  transition: width 0.3s ease; /* Triggers layout + paint */
}

/* ❌ BAD - triggers paint, causes jank */
.blur-animation {
  filter: blur(10px);
  transition: filter 0.3s ease; /* Very expensive */
}
```

**Verification Checklist:**

```css
/* BEFORE approving animation changes, verify: */
/* □ Only transform and opacity are being animated? */
/* □ No width, height, top, left, right, bottom animations? */
/* □ No box-shadow animations (very expensive)? */
/* □ No border-radius animations? */
/* □ will-change property used judiciously (not everywhere)? */
/* □ requestAnimationFrame used for JS animations (not setInterval)? */
```

### 2. Visual Consistency

**Consistent Timing Functions:**

All animations MUST use one of these approved timing functions:

| Timing Function | Use Case | CSS Value |
|-----------------|----------|-----------|
| Smooth ease | General purpose, natural motion | `ease` or `cubic-bezier(0.4, 0, 0.2, 1)` |
| Entrance | Elements appearing | `cubic-bezier(0, 0, 0.2, 1)` (Material standard) |
| Exit | Elements disappearing | `cubic-bezier(0.4, 0, 1, 1)` |
| Emphasis | Attention-grabbing motion | `cubic-bezier(0.2, 0, 0, 1)` |
| Linear | Continuous motion (spindle fibers) | `linear` |

**Prohibited Timing Functions:**
- `ease-in` alone (too slow at start)
- `ease-out` alone (too slow at end)
- Custom bounce effects (distracting in educational context)
- `steps()` functions (looks choppy)

**Consistent Duration Scale:**

| Duration | Use Case | Example |
|----------|----------|---------|
| 150ms | Micro-interactions (hover, focus) | Button press, link hover |
| 300ms | Standard transitions | Phase card entrance, modal open |
| 500ms | Medium animations | Chromosome movement within phase |
| 1000ms | Long animations | Phase transitions |
| 2000ms+ | Simulation speeds | Full mitosis cycle (user-controlled) |

**Color Consistency in Animations:**

```css
/* Biological element colors MUST be consistent across all animations: */

/* Chromosomes */
--color-chromosome: #e74c3c; /* Red family - consistent everywhere */

/* Spindle fibers */
--color-spindle: #3498db; /* Blue family - consistent everywhere */

/* Nuclear envelope */
--color-nucleus: #2ecc71; /* Green family - consistent everywhere */

/* Cell membrane */
--color-cell: #f39c12; /* Orange family - consistent everywhere */
```

### 3. Non-Jank Guarantee

**Performance Budget per Frame:**
- Maximum 2-3 animated elements simultaneously at 60fps
- For 4+ elements, use stagger or sequential animation
- Avoid simultaneous animations on parent AND child elements

**Stagger Pattern for Multiple Elements:**

```css
/* ✅ GOOD - Staggered animations prevent jank */
.chromatid:nth-child(1) { animation-delay: 0ms; }
.chromatid:nth-child(2) { animation-delay: 50ms; }
.chromatid:nth-child(3) { animation-delay: 100ms; }

/* Prevent more than 100ms total stagger for snappy feel */
```

**Reduce Motion Support (Accessibility):**

```css
/* MANDATORY for all animations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Animation Patterns (Approved)

**Phase Transition Pattern:**

```css
@keyframes phase-transition {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.phase-enter {
  animation: phase-transition 500ms cubic-bezier(0, 0, 0.2, 1);
}
```

**Chromosome Movement Pattern:**

```css
@keyframes chromosome-move-to-pole {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(var(--target-x), var(--target-y));
  }
}

.chromosome-moving {
  animation: chromosome-move-to-pole 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform; /* Hint to browser, remove after animation */
}
```

**Spindle Fiber Growth Pattern:**

```css
@keyframes spindle-grow {
  from {
    transform: scaleX(0);
    transform-origin: center;
  }
  to {
    transform: scaleX(1);
  }
}

.spindle-growing {
  animation: spindle-grow 500ms linear;
}
```

### 5. Responsive Animation Behavior

**Viewport-Based Adjustments:**

```css
/* Desktop: Full animations */
@media (min-width: 1024px) {
  .phase-animation {
    animation-duration: 1000ms;
  }
}

/* Tablet: Slightly faster */
@media (min-width: 768px) and (max-width: 1023px) {
  .phase-animation {
    animation-duration: 800ms;
  }
}

/* Mobile: Faster, simpler */
@media (max-width: 767px) {
  .phase-animation {
    animation-duration: 600ms;
  }
}
```

---

## Verification Protocol

When user requests animation changes, follow:

### Step 1: READ
```
1. Read the current animation CSS/JS entirely
2. Identify all animated properties
3. Note timing functions and durations used
4. Check for will-change usage
5. Verify reduce-motion support
```

### Step 2: VERIFY (Against these rules)
```
□ Only transform and opacity animated?
□ Timing functions from approved list?
□ Durations from approved scale?
□ Colors consistent with biological element palette?
□ Stagger used for 3+ elements?
□ Reduce-motion media query present?
□ will-change used appropriately (not on all elements)?
□ No layout/paint-triggering properties animated?
```

### Step 3: PROPOSE
```
1. Show the exact CSS/JS changes
2. Explain why each change maintains/improves consistency
3. Note any risks to existing animations
4. Confirm GPU acceleration is preserved
```

### Step 4: POST-CHANGE CHECK
```
After applying changes:
1. Verify no layout thrashing in DevTools Performance tab
2. Check that 60fps is maintained
3. Confirm reduce-motion still works
4. Test on different viewport sizes
```

---

## Red Flags (WARN USER IMMEDIATELY)

1. **Animating width/height/top/left** → "This causes jank. Use transform instead."
2. **Removing reduce-motion support** → "This breaks accessibility compliance."
3. **Animating filter or box-shadow** → "These are very expensive. Use opacity/transform."
4. **Custom bounce/elastic animations** → "Distracting in educational context. Use standard easing."
5. **Animating 5+ elements simultaneously** → "This will cause frame drops. Use stagger."
6. **Removing will-change from complex animations** → "Browser needs hint for complex animations."
7. **Inconsistent colors in animations** → "Breaks visual consistency. Use CSS variables."

---

## Output Format

When this skill is active:

```
🎨 ANIMATION CONSISTENCY ACTIVE

[Checklist results with ✓ or ✗]

VERIFICATION:
✓ Only transform/opacity animated
✗ Using ease-in (not approved)
✓ Durations from approved scale
✓ Colors consistent
✓ Reduce-motion supported

ISSUES FOUND:
✗ Line 42: transition: left 0.3s ease → Use transform: translateX() instead
✗ Line 57: animation-timing-function: ease-in → Use cubic-bezier(0.4, 0, 0.2, 1)

RECOMMENDATION:
[Specific fix for each issue]
```

---

## Integration with Other Skills

- **simulation-safety**: Coordinate on simulation animation timing
- **educational-ui-builder**: Ensure UI animations are smooth and consistent
- **biology-education-quality**: Verify animated content matches biological accuracy
- **regression-verifier**: Check that animation changes don't break functionality
- **component-reuse-enforcer**: Reuse approved animation patterns

---

## Common Animation Fixes

### Fix 1: Left → Transform
```css
/* BEFORE (janky) */
.slide-in {
  left: -100px;
  transition: left 0.3s ease;
}

/* AFTER (smooth) */
.slide-in {
  transform: translateX(-100px);
  transition: transform 0.3s ease;
}
```

### Fix 2: Width → Scale
```css
/* BEFORE (janky) */
.grow {
  width: 200px;
  transition: width 0.3s ease;
}

/* AFTER (smooth) */
.grow {
  transform: scaleX(2);
  transition: transform 0.3s ease;
}
```

### Fix 3: Multiple Properties → Transform
```css
/* BEFORE (janky) */
.move-and-size {
  left: 100px;
  top: 50px;
  width: 200px;
  transition: all 0.3s ease;
}

/* AFTER (smooth) */
.move-and-size {
  transform: translate(100px, 50px) scaleX(2);
  transition: transform 0.3s ease;
}
```

---

## Skill Maintenance

Update this skill when:
- New animation patterns are introduced
- Performance benchmarks change
- Browser support for animation features changes
- User feedback indicates consistency issues
- New CSS features become available (e.g., `@scroll-timeline`)

Version history tracked in `/.claude/skill-evolution-log.md`.
