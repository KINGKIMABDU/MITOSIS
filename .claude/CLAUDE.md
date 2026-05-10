---
description: Claude Code instructions for the MITOSIS interactive biology education website
project: MITOSIS - Interactive Educational Biology Website
domain: Cell Biology / Mitosis Education
audience: Students, Educators, Self-learners
---

# MITOSIS - Interactive Biology Education Website

## Project Overview

This is an interactive educational website focused on teaching mitosis through:
- **Explanations**: Clear, scientifically accurate text content about cell division
- **Animations**: Smooth, visually appealing transitions showing mitosis phases
- **Simulations**: Interactive components allowing students to explore mitosis dynamics
- **Educational UI**: Premium student-friendly interface design
- **Interactive Learning Components**: Hands-on elements that reinforce understanding

## Core Principles

### Scientific Accuracy (NON-NEGOTIABLE)
- All biological explanations MUST be scientifically correct and peer-reviewed standard
- Mitosis phase descriptions (Prophase, Prometaphase, Metaphase, Anaphase, Telophase, Cytokinesis) must follow established cell biology curriculum
- Chromosome behavior, spindle formation, nuclear envelope changes must be anatomically accurate
- When in doubt, consult standard biology textbooks (Campbell, Alberts Molecular Biology of the Cell)
- Never sacrifice accuracy for visual appeal

### Educational Clarity
- Content must be appropriate for the target educational level
- Explanations should progress logically from simple to complex concepts
- Use scaffolding: introduce terminology before using it extensively
- Define all scientific terms on first use
- Maintain consistent nomenclature throughout (e.g., always "chromatid" not switching with "chromosome" inappropriately)

### Visual Hierarchy & Design
- Maintain beautiful, polished visual hierarchy in all UI components
- Headers, subheaders, and body text must follow established typographic scale
- Color coding must be consistent (e.g., chromosomes always same color, spindle fibers distinct)
- White space must be used purposefully to reduce cognitive load
- Educational content should never feel cluttered

### Accessibility Standards
- All interactive elements must be keyboard navigable
- Color contrast ratios must meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- Animations must respect `prefers-reduced-motion` media query
- Screen reader descriptions for all simulation states and animation phases
- Alt text for all educational diagrams and visual aids

### Simulation Correctness
- Simulation logic must accurately model biological processes
- Timing of phase transitions must reflect relative biological timescales
- Interactive elements must respond with biologically meaningful feedback
- State machines for cell cycle progression must be mathematically sound
- Edge cases in simulation (e.g., user interrupts animation) must be handled gracefully

### Minimal Invasive Edits (DEFAULT BEHAVIOR)
- **PREFER** targeted, surgical edits over large refactoring
- **BEFORE** any substantial change, verify the existing code works as intended
- **NEVER** rewrite working code "to make it cleaner" without explicit user request
- **ALWAYS** ask before changes affecting more than 3 files or 50 lines per file
- **PRESERVE** all existing functionality when making modifications
- **TEST** changes in context before declaring complete

### Responsive Behavior
- All components must work across desktop, tablet, and mobile viewports
- Touch interactions must be supported for mobile simulations
- Text must remain readable at all screen sizes (minimum 16px body)
- Interactive simulations must adapt to available screen real estate
- Navigation must be usable on small screens (hamburger menus, stacked layouts)

### Reusable Educational Components
- Educational UI patterns should be extracted into reusable components
- Simulation controls (play, pause, reset, speed) should share a common interface
- Phase description cards should use consistent styling and behavior
- Animation containers should accept configurable parameters
- **BEFORE** creating new component, check if existing one can be extended

### Animation Smoothness
- All animations must run at 60fps or better
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left` directly
- `requestAnimationFrame` for JavaScript-driven animations
- CSS transitions preferred over JS animations when possible
- Animation durations should feel natural (not too fast, not too slow)
- Stagger animations to avoid frame drops on complex sequences

## Development Guidelines

### Code Structure
- Components should be single-responsibility
- State management should be minimal and localized
- Props should be clearly typed (TypeScript interfaces)
- CSS should use consistent methodology (BEM or CSS Modules)

### Educational Content Review
- Any change to explanatory text requires accuracy verification
- Diagrams must be reviewed for scientific correctness
- Quiz/simulation feedback must reinforce correct understanding
- Common misconceptions should be addressed proactively

### Testing Expectations
- Visual regression testing for UI components
- Functional testing for simulation logic
- Cross-browser testing for animations
- Accessibility testing with screen readers

## File Organization

```
/
├── index.html              # Main entry point
├── css/                    # Stylesheets
│   ├── main.css           # Core styles
│   ├── animations.css     # Animation definitions
│   └── components/        # Component-specific styles
├── js/                     # JavaScript
│   ├── app.js             # Main application logic
│   ├── simulations/       # Simulation engines
│   ├── animations/         # Animation controllers
│   └── components/        # UI component logic
├── assets/                 # Static assets
│   ├── images/            # Diagrams, icons
│   └── fonts/             # Typography
└── content/                # Educational content
    └── explanations/      # Text content by phase
```

## When Working on This Project

1. **Read CLAUDE.md first** - Understand the educational context and constraints
2. **Verify biological accuracy** - When editing content, ensure correctness
3. **Test animations** - Verify smoothness after any animation-related changes
4. **Check responsiveness** - Test at multiple viewport sizes
5. **Preserve working code** - Minimal invasive edits are the default
6. **Think like an educator** - Every change should improve student understanding
7. **Maintain visual quality** - This is a premium educational experience

## Prohibited Actions (Without Explicit User Request)

- Removing or disabling existing animations
- Changing established color schemes for biological elements
- Rewriting simulation logic "for cleanliness"
- Removing educational content
- Degrading accessibility features
- Breaking responsive layouts
- Introducing dependencies without justification
