---
name: regression-verifier
description: This skill provides a comprehensive verification system to ensure that changes to the MITOSIS project do not introduce regressions.
version: 1.0.0
created: 2026-05-06
last_modified: 2026-05-06
type: verification
scope: regression-testing, functionality-checks, post-change-verification
triggers:
  - after making any code changes
  - after refactoring operations
  - after modifying simulation logic
  - after changing UI components
  - after modifying animations
  - after updating educational content
  - user requests "verify no regressions"
dependencies: []
conflicts: []
---

# Regression Verifier Skill

## Purpose

This skill provides a comprehensive verification system to ensure that changes to the MITOSIS project do not introduce regressions. It systematically verifies that existing functionality, animations, educational content, and UI elements continue to work correctly after any modification.

---

## Activation Criteria

Activate this skill when:
- After making ANY code changes (automatic activation recommended)
- After completing a refactoring operation
- After modifying simulation logic or state machines
- After changing UI components or layouts
- After modifying CSS animations or transitions
- After updating educational content or explanations
- User explicitly requests "check for regressions" or "verify changes"
- Before committing changes to version control

---

## Core Philosophy

**"Assume regressions exist until proven otherwise."**

Every change, no matter how small, has the potential to break existing functionality. This skill enforces a rigorous verification process that checks all affected and potentially affected areas.

---

## Verification Categories

### 1. Functional Regression Checks

**Simulation Functionality:**
```markdown
□ Simulation starts when Play button clicked
□ Simulation pauses when Pause button clicked
□ Simulation resumes from exact pause point
□ Simulation resets to initial state
□ All 6 phases progress in correct order
□ Phase transitions occur at correct timing
□ Speed control affects all phases proportionally
□ Keyboard shortcuts work (space=play/pause, r=reset)
```

**Animation Functionality:**
```markdown
□ All phase transition animations play
□ Chromosome movement animations smooth (60fps)
□ Spindle fiber growth animations correct
□ Nuclear envelope fragment/reform animations work
□ No animation glitches during phase transitions
□ Animations respect prefers-reduced-motion
□ Stagger animations work (not all at once)
□ No jank or frame drops visible
```

**Interaction Functionality:**
```markdown
□ All buttons clickable and respond
□ All links navigate correctly
□ Hover states work on desktop
□ Touch interactions work on mobile
□ Drag interactions function (if applicable)
□ Keyboard navigation works (tab through elements)
□ Focus indicators visible
□ Form inputs accept input correctly
```

**Content Functionality:**
```markdown
□ All phase explanations display correctly
□ Images/diagrams load properly
□ Links to external resources work
□ Quiz questions display with all options
□ Quiz feedback appears after answering
□ Progress tracking updates correctly
□ No broken text or missing content
```

### 2. Visual Regression Checks

**Layout Integrity:**
```markdown
□ No layout shifts or unexpected movement
□ All elements positioned correctly
□ No overlapping elements
□ Text not cut off or overflowing
□ Images display at correct size
□ Grid/flex layouts maintain structure
□ No horizontal scrollbars (unless designed)
□ Footer stays at bottom of page
```

**Responsive Behavior:**
```markdown
□ Layout correct at 375px (mobile S)
□ Layout correct at 768px (tablet)
□ Layout correct at 1024px (laptop)
□ Layout correct at 1440px (desktop)
□ No elements too small to tap on mobile
□ Text readable at all sizes
□ Images scale appropriately
□ Navigation adapts correctly
```

**Color and Contrast:**
```markdown
□ Biological element colors consistent
  □ Chromosomes: red (#e74c3c)
  □ Spindle: blue (#3498db)
  □ Nucleus: green (#2ecc71)
  □ Cell membrane: orange (#f39c12)
□ Text contrast meets WCAG 2.1 AA (4.5:1)
□ Interactive elements visually distinct
□ Hover/focus states visible
□ No color bleeding or overlapping
```

**Animation Smoothness:**
```markdown
□ Animations run at 60fps (check DevTools)
□ No layout thrashing during animations
□ GPU-accelerated properties only (transform, opacity)
□ No animated properties triggering layout/paint
□ Animation timing consistent
□ No flickering or flashing
```

### 3. Educational Content Checks

**Scientific Accuracy:**
```markdown
□ Phase descriptions scientifically correct
□ Terminology used correctly
□ No contradictions between text and animations
□ Common misconceptions addressed
□ Content appropriate for target audience
□ All technical terms defined
```

**Content Completeness:**
```markdown
□ All 6 phases have content
□ No missing explanations
□ No broken images or diagrams
□ Links to additional resources work
□ Quiz questions have correct answers
□ Feedback text is accurate and helpful
```

### 4. Accessibility Regression Checks

**Keyboard Navigation:**
```markdown
□ All interactive elements reachable via Tab
□ Tab order is logical (top to bottom, left to right)
□ Shift+Tab goes backward correctly
□ Enter/Space activate buttons
□ Escape closes modals/dialogs
□ Arrow keys work in menus/option groups
```

**Screen Reader Support:**
```markdown
□ All images have alt text
□ ARIA labels present on interactive elements
□ aria-live regions update correctly
□ Phase changes announced to screen readers
□ Form inputs have associated labels
□ Error messages linked to inputs
```

**Visual Accessibility:**
```markdown
□ Color contrast sufficient (4.5:1 for text)
□ Text resizable up to 200% without breaking
□ Content readable with 400% zoom
□ No content hidden by overflow:hidden
□ Focus indicators clearly visible
□ Reduced motion media query respected
```

### 5. Performance Regression Checks

**Loading Performance:**
```markdown
□ Page loads within 3 seconds on 3G
□ No unnecessary network requests
□ Images properly sized (not 4K for thumbnails)
□ CSS/JS files minified (in production)
□ No 404 errors for assets
□ Fonts load without invisible text (use font-display)
```

**Runtime Performance:**
```markdown
□ Animations maintain 60fps
□ No memory leaks (check DevTools Memory)
□ No excessive DOM manipulation
□ Event listeners properly cleaned up
□ No console errors or warnings
□ CPU usage reasonable during animations
```

---

## Verification Protocol

### Quick Verification (After Small Changes)

For changes affecting ≤2 files and ≤50 lines:

```markdown
## Quick Regression Check

### Changed Files:
- [file1] - [what changed]

### Functional Check:
□ Main simulation functionality works
□ Changed component behaves correctly
□ No console errors

### Visual Check:
□ Layout unchanged (or changed as expected)
□ Styling correct
□ Responsive behavior preserved

### Content Check (if applicable):
□ Text displays correctly
□ No broken images

RESULT: ✅ PASS / ❌ FAIL (explain issues)
```

### Full Verification (After Major Changes)

For changes affecting >2 files or >50 lines:

```markdown
## Full Regression Verification

### Phase 1: Functional Verification
[Run through ALL checks in Category 1]
Result: ✅ PASS / ❌ FAIL

### Phase 2: Visual Verification  
[Run through ALL checks in Category 2]
Result: ✅ PASS / ❌ FAIL

### Phase 3: Content Verification
[Run through ALL checks in Category 3]
Result: ✅ PASS / ❌ FAIL

### Phase 4: Accessibility Verification
[Run through ALL checks in Category 4]
Result: ✅ PASS / ❌ FAIL

### Phase 5: Performance Verification
[Run through ALL checks in Category 5]
Result: ✅ PASS / ❌ FAIL

### Overall Result:
✅ ALL PASS - Safe to proceed
❌ FAILURES DETECTED - Fix issues before proceeding
```

---

## Automated Verification Snippets

### Console Error Check
```javascript
// Run in browser console after changes
console.log('Errors:', window.errorCount || 0);
// Errors should be 0
```

### Animation FPS Check
```javascript
// Check animation performance
let frameCount = 0;
let lastTime = performance.now();
function countFrames() {
  frameCount++;
  const currentTime = performance.now();
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = currentTime;
  }
  requestAnimationFrame(countFrames);
}
countFrames();
// Should log ~60 FPS
```

### Responsive Check
```javascript
// Test breakpoints
const breakpoints = [375, 768, 1024, 1440];
breakpoints.forEach(bp => {
  console.log(`Testing ${bp}px width`);
  // Manually verify layout at each width
});
```

---

## Output Format

When this skill is active:

```
🔍 REGRESSION VERIFIER ACTIVE

CHANGE SUMMARY:
Files modified: [list]
Lines changed: [count]
Type of change: [simulation/ui/content/animation]

VERIFICATION RESULTS:

FUNCTIONAL:
✅ Simulation starts/stops correctly
✅ All phase transitions work
✅ Speed control functional
❌ Reset button doesn't clear state ← ISSUE FOUND

VISUAL:
✅ Layout intact
✅ Responsive behavior preserved
✅ Colors consistent
⚠️ Chromosome animation slightly janky at 375px

CONTENT:
✅ All text displays correctly
✅ No broken images
✅ Phase explanations accurate

ACCESSIBILITY:
✅ Keyboard navigation works
✅ Screen reader announcements work
✅ Color contrast sufficient

PERFORMANCE:
✅ 60fps maintained
✅ No console errors
✅ Page loads quickly

OVERALL: ❌ 1 CRITICAL ISSUE FOUND
- Reset button doesn't clear state (Functional #4)

RECOMMENDATION: Fix critical issue before proceeding.
```

---

## Common Regressions and Fixes

| Regression | Symptom | Fix |
|-----------|---------|-----|
| State not cleared on reset | Simulation continues from old state | Clear all state variables in reset() |
| Animation jank | Frame drops during animation | Use transform/opacity only, check DevTools |
| Broken responsive | Layout breaks at certain widths | Check media queries, test all breakpoints |
| Missing alt text | Screen readers can't describe images | Add alt attributes to all images |
| Color contrast low | Text hard to read | Use contrast checker, adjust colors |
| Keyboard trap | Can't tab out of component | Ensure all interactive elements in tab order |
| Memory leak | Performance degrades over time | Clean up event listeners, intervals |

---

## Integration with Other Skills

- **simulation-safety**: Run verification after simulation changes
- **animation-consistency**: Verify animations after changes
- **educational-ui-builder**: Check UI after component changes
- **biology-education-quality**: Verify content accuracy
- **safe-refactor-protocol**: Mandatory after refactoring
- **component-reuse-enforcer**: Verify reused components still work

---

## When to Skip Verification

**NEVER SKIP FULL VERIFICATION FOR:**
- Simulation logic changes
- State machine modifications
- Animation system changes
- Core UI component changes

**MAY SKIP FULL VERIFICATION FOR:**
- Comment-only changes
- Whitespace/formatting changes
- Documentation updates (verify content links though)

Even for "minor" changes, do a Quick Verification at minimum.

---

## Skill Maintenance

Update this skill when:
- New features are added (add verification checks)
- New types of regressions are discovered
- Browser support changes affect testing
- User feedback reveals missing checks
- New accessibility requirements emerge

Version history tracked in `/.claude/skill-evolution-log.md`.
