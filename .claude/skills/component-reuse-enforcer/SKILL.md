---
name: component-reuse-enforcer
version: 1.0.0
description: Enforces component reuse and prevents duplicate components by auditing existing patterns before new creation.
created: 2026-05-06
last_modified: 2026-05-06
type: architecture-enforcement
scope: component-patterns, reuse-audit, duplicate-prevention, modular-design
triggers:
  - creating new UI components
  - before implementing new features
  - user requests new interactive element
  - modifying existing component structure
  - planning new page or section
  - user says "create a new [component]"
  - detecting similar existing components
dependencies: []
conflicts: []
---

# Component Reuse Enforcer Skill

## Purpose

This skill prevents the creation of duplicate or near-duplicate components in the MITOSIS project. It enforces a culture of reuse, extension, and modular design. Before any new component is created, this skill audits existing components and determines if an existing one can be extended or parameterized instead.

---

## Activation Criteria

Activate this skill when:
- User requests creation of a new component ("create a button", "build a card")
- Before implementing new interactive elements
- Modifying existing component structure
- Planning new pages or sections
- User says "add a new [component type]"
- You detect similar existing components during development
- Refactoring or reorganizing component library

---

## Core Philosophy

**"Reuse before recreate."**

Every new component MUST be justified against existing components. The goal is a lean, maintainable component library where each component has a clear, single purpose and variations are handled through props/modifiers, not new components.

---

## Component Audit Protocol

### Step1: SEARCH (Mandatory Before Creating Anything)

Before creating a new component, search the codebase:

```bash
# Search for similar components
# For a new "phase card" component:
grep -r "card" --include="*.html" --include="*.js" --include="*.css"

# For a new "button" component:
grep -r "button\|btn" --include="*.css"

# For a new "modal" component:
grep -r "modal\|dialog\|popup" --include="*.html" --include="*.js"
```

**Search Checklist:**
```markdown
□ Searched for component type in HTML files
□ Searched for component type in CSS files
□ Searched for component type in JS files
□ Reviewed component naming conventions
□ Checked if similar component already exists
```

### Step2: COMPARE (Analyze Existing Components)

If similar components exist, create comparison:

```markdown
## Component Comparison for: [New Component Request]

### Existing Similar Components:

**Component 1: [Name]**
- Location: [file path]
- Purpose: [what it does]
- Props/Modifiers: [list]
- Visual Style: [description]
- Responsive: [yes/no]
- Accessible: [yes/no]

**Component 2: [Name]**
- Location: [file path]
- Purpose: [what it does]
- Props/Modifiers: [list]
- Visual Style: [description]
- Responsive: [yes/no]
- Accessible: [yes/no]

### Can Existing Component Be Extended?

□ Yes, with modifier class → Use [Component X] with [modifier]
□ Yes, with new prop → Extend [Component X] with [prop]
□ Yes, with slight modification → Modify [Component X]
□ No, genuinely new component needed → Justify below

### Justification for New Component (if needed):
[Explain why existing components cannot be extended]
```

### Step3: DECIDE (Choose Path)

```
PATH A: EXTEND EXISTING (PREFERRED)
→ Add modifier class to existing component
→ Add new prop to existing component
→ Document new variation

PATH B: REFACTOR THEN EXTEND
→ Refactor existing similar components into shared base
→ Extend the base component
→ Remove duplication

PATH C: CREATE NEW (LAST RESORT)
→ Document why reuse is impossible
→ Create with reuse in mind
→ Add to component library documentation
```

---

## Component Library (Track Existing Components)

### UI Components

#### Button (`.btn`)
```css
/* Location: css/components/buttons.css */
/* Purpose: All interactive buttons */
/* Modifiers: --primary, --secondary, --danger, --small, --large */
.btn { /* base styles */ }
.btn--primary { /* primary action */ }
.btn--secondary { /* secondary action */ }
.btn--danger { /* destructive action */ }
.btn--small { /* small button */ }
.btn--large { /* large button */ }
```
**Reuse Check**: Before creating new button, use `.btn` with appropriate modifier.

#### Phase Card (`.phase-card`)
```css
/* Location: css/components/cards.css */
/* Purpose: Display mitosis phase information */
/* Modifiers: --prophase, --prometaphase, --metaphase, etc. */
.phase-card { /* base styles */ }
.phase-card--prophase { /* red theme */ }
.phase-card--metaphase { /* blue theme */ }
/* etc. */
```
**Reuse Check**: Before creating phase display, use `.phase-card`.

#### Simulation Controls (`.sim-controls`)
```css
/* Location: css/components/simulation.css */
/* Purpose: Control simulation playback */
/* Elements: __btn, __speed, __label */
.sim-controls { /* container */ }
.sim-controls__btn { /* play/pause/reset */ }
.sim-controls__speed { /* speed slider */ }
```
**Reuse Check**: Before creating new simulation UI, use `.sim-controls`.

#### Quiz Component (`.quiz-question`)
```css
/* Location: css/components/quiz.css */
/* Purpose: Display quiz questions with feedback */
.quiz-question { /* container */ }
.quiz-option { /* answer option */ }
.quiz-feedback { /* correct/incorrect feedback */ }
```
**Reuse Check**: Before creating new quiz element, use `.quiz-question`.

### Educational Components

#### Tooltip (`.bio-tooltip`)
```css
/* Location: css/components/tooltips.css */
/* Purpose: Explain biological terms on hover/focus */
.bio-tooltip { /* dotted underline */ }
.bio-tooltip::after { /* tooltip content */ }
```

#### Progress Bar (`.progress-bar`)
```css
/* Location: css/components/progress.css */
/* Purpose: Show mitosis progress */
.progress-bar { /* container */ }
.progress-bar__fill { /* animated fill */ }
```

### Animation Components

#### Fade In (`.animate--fade-in`)
```css
/* Location: css/animations.css */
/* Purpose: Fade in elements */
.animate--fade-in { animation: fadeIn 300ms ease; }
```

#### Slide In (`.animate--slide-in`)
```css
/* Location: css/animations.css */
/* Purpose: Slide elements in from direction */
.animate--slide-in { animation: slideIn 500ms cubic-bezier(0, 0, 0.2, 1); }
```

---

## BEM Naming Convention (Enforced)

All components MUST follow BEM (Block Element Modifier):

```css
/* BLOCK: Standalone component */
.phase-card { }

/* ELEMENT: Part of block, no standalone meaning */
.phase-card__header { }
.phase-card__title { }
.phase-card__content { }

/* MODIFIER: Variation of block/element */
.phase-card--prophase { }
.phase-card__title--large { }
```

**BEM Checklist (verify before creating component):**
```markdown
□ Block name is unique and descriptive
□ Elements use double underscore: block__element
□ Modifiers use double dash: block--modifier
□ No deep nesting (max 1 level: block__element)
□ No element-of-element (no block__element__subelement)
```

---

## Component Creation Template

When a new component is TRULY needed:

```css
/* ============================================
   Component: [Component Name]
   Location: css/components/[name].css
   Purpose: [What it does]
   BEM Block: [block-name]
   Modifiers: [list]
   Created: [date]
   ============================================ */

/* Block */
.[block-name] {
  /* Layout */
  display: flex; /* or grid, block, etc. */
  
  /* Box Model */
  padding: var(--space-md);
  margin: var(--space-sm);
  
  /* Visual */
  background: var(--neutral-50);
  border: 1px solid var(--neutral-200);
  border-radius: 8px;
  
  /* Typography */
  font-family: inherit;
  font-size: var(--text-base);
  
  /* Animation (if needed) */
  transition: transform 200ms ease, opacity 200ms ease;
}

/* Elements */
.[block-name]__header {
  /* Element-specific styles */
}

.[block-name]__content {
  /* Element-specific styles */
}

/* Modifiers */
.[block-name]--primary {
  background: var(--edu-primary);
  color: white;
}

.[block-name]--small {
  padding: var(--space-sm);
  font-size: var(--text-sm);
}

/* States */
.[block-name]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.[block-name]:focus-within {
  outline: 3px solid var(--edu-primary);
  outline-offset: 2px;
}

.[block-name]--disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 767px) {
  .[block-name] {
    /* Mobile adjustments */
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .[block-name] {
    transition: none;
  }
}
```

```html
<!-- Component HTML Template -->
<div class="[block-name] [block-name]--[modifier]">
  <div class="[block-name]__header">
    <!-- Header content -->
  </div>
  <div class="[block-name]__content">
    <!-- Main content -->
  </div>
</div>
```

---

## Duplicate Detection Patterns

### Pattern1: Similar CSS Classes
```css
/* ❌ DUPLICATE DETECTED */
.phase-box { background: white; border: 1px solid #e8e8f0; border-radius: 8px; }
.phase-card { background: white; border: 1px solid #e8e8f0; border-radius: 8px; }

/* ✅ REUSE */
.phase-card { /* shared styles */ }
```

### Pattern2: Similar HTML Structure
```html
<!-- ❌ DUPLICATE DETECTED -->
<div class="phase-one">...</div>
<div class="phase-two">...</div>

<!-- ✅ REUSE -->
<div class="phase-card phase-card--prophase">...</div>
<div class="phase-card phase-card--metaphase">...</div>
```

### Pattern3: Repeated JavaScript Logic
```javascript
// ❌ DUPLICATE DETECTED
function playProphase() { animation.play(); }
function playMetaphase() { animation.play(); }

// ✅ REUSE
function playPhase(phaseName) { animations[phaseName].play(); }
```

---

## Output Format

When this skill is active:

```
♻️ COMPONENT REUSE ENFORCER ACTIVE

REQUEST: Create new [component type]

AUDIT RESULTS:
□ Searched existing components: ✅ Found 2 similar
□ Compared with existing: ✅
□ Reuse assessment: [Extend/Refactor/Create New]

RECOMMENDATION:
[Specific recommendation with code example]

EXISTING COMPONENT:
- Name: [component]
- Location: [file]
- Modifiers: [list]

PROPOSED ACTION:
✅ PREFERRED: Extend [component] with [modifier]
  Code: .existing-component--new-modifier { }

❌ AVOID: Creating new component from scratch
  Reason: Duplicates [component] functionality
```

---

## Enforcement Rules

1. **No new component without audit** - Always run Step1 (SEARCH) first
2. **No duplicate styling** - If two components look 80%+ similar, refactor
3. **Modifiers over new components** - Use `--modifier` not new `.component2`
4. **Shared base classes** - Extract `.card` base if multiple card types
5. **Document all components** - Update this skill's Component Library section

---

## Common Violations and Fixes

| Violation | Example | Fix |
|-----------|---------|-----|
| Duplicate button styles | `.btn-blue`, `.btn-red` | Use `.btn--primary`, `.btn--danger` |
| Similar card components | `.phase-card`, `.info-card` | Share `.card` base, extend both |
| Repeated animation CSS | `.fade1`, `.fade2` | Use `.animate--fade-in` with delay |
| Multiple modal patterns | `.modal`, `.dialog`, `.popup` | Unify to `.modal` with modifiers |
| Scattered tooltip CSS | Multiple tooltip classes | Use `.bio-tooltip` everywhere |

---

## Integration with Other Skills

- **educational-ui-builder**: Consult before creating new UI components
- **safe-refactor-protocol**: Use when refactoring to shared base
- **regression-verifier**: Verify reused components still work after changes
- **animation-consistency**: Ensure reused components use approved animations
- **simulation-safety**: Check if simulation components can be reused
- **biology-education-quality**: Verify educational components maintain accuracy

---

## Skill Maintenance

Update this skill when:
- New components are added to the library (document them)
- Component patterns evolve
- New BEM conventions are adopted
- Duplicate components are discovered and refactored
- User feedback reveals reuse opportunities

**Component Library Updates:**
When adding new component, add to "Component Library" section above with:
- Component name and BEM block
- Location (file path)
- Purpose and modifiers
- Date added

Version history tracked in `/.claude/skill-evolution-log.md`.
