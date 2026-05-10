---
name: simulation-safety
version: 1.0.0
created: 2026-05-06
last_modified: 2026-05-06
description: Ensures simulation logic, state machines, timing, and animation correctness are preserved during code changes.
type: safety-verification
scope: simulations, state-machines, timing, animation-logic
triggers:
  - modifying simulation engine code
  - changing state machine transitions
  - adjusting animation timing
  - editing mitosis phase progression logic
  - modifying user interaction handlers in simulations
  - changing simulation speed or controls
dependencies: []
conflicts: []
---

# Simulation Safety Skill

## Purpose

This skill acts as a protective barrier around all simulation-related code in the MITOSIS project. It ensures that modifications to simulation logic, state machines, timing systems, and animation correctness never introduce regressions or break the educational experience.

---

## Activation Criteria

Activate this skill when:
- User requests changes to simulation engine or logic
- Modifying state machine transitions for cell cycle phases
- Changing timing constants or animation durations
- Editing event handlers in simulation components
- Adjusting simulation speed controls or playback
- Modifying chromosome movement algorithms
- Changing spindle fiber behavior logic
- Editing user interaction (drag, click, hover) in simulations

---

## Core Responsibilities

### 1. Simulation Logic Integrity

**State Machine Protection:**

The mitosis simulation follows a strict state machine:

```
INTERPHASE_S → PROPHASE → PROMETAPHASE → METAPHASE → 
ANAPHASE → TELOPHASE → CYTOKINESIS → COMPLETE
```

**Rules:**
- States MUST progress linearly (no skipping phases unless user triggers "skip to phase")
- Each state transition MUST complete all exit conditions before entering next state
- State transitions MUST be atomic (no partial state changes visible to user)
- Invalid state transitions MUST be rejected with console warning
- State history MUST be preservable (for "go back" functionality)

**Verification Before Any State Machine Change:**

```javascript
// VERIFICATION CHECKLIST (run before approving changes):
// □ Does the change preserve linear progression?
// □ Are all exit conditions for current state met before transition?
// □ Is the transition atomic (no visual glitches)?
// □ Are invalid transitions properly rejected?
// □ Does "go back" still work after this change?
// □ Are phase-specific behaviors preserved?
```

### 2. Timing Consistency

**Biological Time Ratios (relative durations):**

| Phase | Relative Duration | Typical Simulation Time |
|-------|------------------|----------------------|
| Prophase | Longest (30-40%) | ~3-4 seconds |
| Prometaphase | Medium (15-20%) | ~1.5-2 seconds |
| Metaphase | Short (10-15%) | ~1-1.5 seconds |
| Anaphase | Medium (15-20%) | ~1.5-2 seconds |
| Telophase | Long (20-25%) | ~2-2.5 seconds |
| Cytokinesis | Medium (10-15%) | ~1-1.5 seconds |

**Timing Rules:**
- Relative durations between phases MUST be preserved
- Absolute durations may change (user speed control), but ratios stay constant
- Animation frame timing MUST use `requestAnimationFrame` (not `setTimeout`)
- Timing MUST be pause-able and resumable without drift
- Speed multiplier MUST affect all phases proportionally

**Timing Verification:**

```javascript
// BEFORE CHANGING TIMING CODE:
// □ Are phase duration RATIOS preserved?
// □ Does pause/resume work without time drift?
// □ Does speed control affect all phases equally?
// □ Are requestAnimationFrame timestamps used (not Date.now())?
// □ Is the animation loop properly cancelled on pause/stop?
```

### 3. Animation Correctness

**Chromosome Movement Rules:**
- Chromosomes MUST move along spindle fibers (not through them)
- Centromeres lead during anaphase movement ("V" shape)
- Sister chromatids MUST separate synchronously (not one-by-one)
- Chromosome rotation during movement MUST be biologically plausible
- Overlapping chromosomes MUST be visually distinguishable

**Spindle Fiber Rules:**
- Fibers MUST attach to kinetochores (centromere region)
- Fibers MUST show tension (slight stretch) when attached
- Fibers MUST shorten from kinetochore end (not pole end) during anaphase
- Free fibers (not attached) MUST show dynamic instability (growing/shrinking)
- Fiber opacity/color MUST indicate attachment status

**Nuclear Envelope Rules:**
- MUST fragment during prometaphase (not disappear instantly)
- Fragments MUST be visible during prometaphase
- MUST re-form around chromosome sets during telophase
- Re-formation MUST be gradual (not instant)

**Verification Before Animation Changes:**

```javascript
// □ Do chromosomes follow spindle fibers during movement?
// □ Does anaphase show centromere-first "V" shape movement?
// □ Do sister chromatids separate together (not sequentially)?
// □ Do spindle fibers attach at centromere/kinetochore?
// □ Does nuclear envelope fragment gradually (prometaphase)?
// □ Does nuclear envelope reform gradually (telophase)?
// □ Are all animations reversible (for "go back" feature)?
```

### 4. Interaction Safety

**User Interaction Rules:**
- Click-to-inspect on chromosomes MUST not trigger phase advancement
- Drag interactions MUST have appropriate hit areas (not too small)
- Speed control MUST take effect on next animation frame (not mid-frame)
- Pause/Resume MUST preserve exact frame state
- Reset MUST return to initial state completely (no residual state)

**Input Validation:**

```javascript
// □ Are all user inputs validated before processing?
// □ Do drag operations have minimum distance thresholds?
// □ Are rapid clicks debounced appropriately?
// □ Does pause preserve exact animation state?
// □ Does reset clear ALL simulation state?
```

---

## Safety Protocol

When user requests simulation changes, follow this protocol:

### Phase 1: ASSESS
```
1. READ the current simulation code entirely
2. IDENTIFY what state machines are affected
3. MAP all dependencies (what calls this? what does this call?)
4. CHECK if timing constants are involved
5. VERIFY if animation logic is touched
```

### Phase 2: VERIFY
```
1. Run through Simulation Logic Integrity checklist
2. Run through Timing Consistency checklist
3. Run through Animation Correctness checklist
4. Run through Interaction Safety checklist
5. IDENTIFY any risks to existing functionality
```

### Phase 3: PROPOSE
```
1. Present minimal invasive edit (preferred)
2. Show exactly what lines will change
3. Explain WHY each change is necessary
4. List what is being preserved
5. Flag any risks discovered in Phase 2
```

### Phase 4: CONFIRM
```
BEFORE applying changes, present:

⚠️ SIMULATION SAFETY CHECKLIST
□ I have verified state machine integrity
□ I have verified timing consistency
□ I have verified animation correctness
□ I have verified interaction safety
□ I am making minimal invasive edits
□ I have identified all affected components
□ I have a rollback plan if regression occurs

Only proceed when ALL boxes are checked.
```

### Phase 5: APPLY & VERIFY
```
1. Apply the changes
2. Mentally simulate all phase transitions
3. Check that pause/resume still works
4. Verify speed control functionality
5. Confirm reset behavior
```

---

## Red Flags (STOP and WARN USER)

Immediately warn and request confirmation if user requests:

1. **Removing state machine validation** - "This could allow invalid phase transitions"
2. **Changing timing to fixed values** - "This breaks proportional speed control"
3. **Replacing requestAnimationFrame with setTimeout/setInterval** - "This causes janky animations"
4. **Removing pause/resume capability** - "This degrades user experience"
5. **Skipping phase transitions** - "This breaks educational progression"
6. **Changing chromosome movement algorithm** - "Verify biological accuracy with /biology-education-quality"
7. **Modifying spindle attachment logic** - "Verify biological accuracy with /biology-education-quality"

---

## Output Format

When this skill is active, prefix responses with:

```
🔬 SIMULATION SAFETY ACTIVE

[Response content with specific checklist items checked]
```

### Example Warning:

```
🔬 SIMULATION SAFETY WARNING

The requested change modifies the state transition in mitosis.js:
- OLD: transition to anaphase only after all chromosomes aligned
- NEW: transition to anaphase after timeout

⚠️ RISK: This breaks the metaphase checkpoint simulation
⚠️ IMPACT: Students learn incorrect biology (cells can skip checkpoint)
⚠️ EDUCATIONAL HARM: High - teaches wrong biological principle

RECOMMENDATION: Do not make this change.
ALTERNATIVE: Implement proper checkpoint simulation with 
             timeout only as fallback for stalled simulations.

Proceed anyway? [Requires explicit user confirmation]
```

---

## Integration with Other Skills

- **biology-education-quality**: Verify simulation behavior matches biological reality
- **animation-consistency**: Ensure simulation animations remain smooth
- **regression-verifier**: Run after changes to verify no regressions
- **safe-refactor-protocol**: Use when major simulation refactoring is needed
- **component-reuse-enforcer**: Check if simulation patterns can be reused

---

## Simulation Code Patterns (Preferred)

### State Machine Pattern:
```javascript
const MitosisState = {
  PROPHASE: 'prophase',
  PROMETAPHASE: 'prometaphase',
  // ... etc
};

class MitosisSimulation {
  constructor() {
    this.state = MitosisState.PROPHASE;
    this.prevState = null;
    this.isTransitioning = false;
  }
  
  transitionTo(newState) {
    if (this.isTransitioning) return; // Prevent double transitions
    if (!this.canTransitionTo(newState)) return;
    
    this.isTransitioning = true;
    this.prevState = this.state;
    
    // Perform transition...
    this.state = newState;
    this.isTransitioning = false;
  }
  
  canTransitionTo(state) {
    // Linear progression check
    const order = Object.values(MitosisState);
    const currentIdx = order.indexOf(this.state);
    const newIdx = order.indexOf(state);
    return newIdx === currentIdx + 1;
  }
}
```

### Animation Loop Pattern:
```javascript
class AnimationLoop {
  start() {
    this.running = true;
    this.lastTimestamp = null;
    this.rafId = requestAnimationFrame((ts) => this.loop(ts));
  }
  
  loop(timestamp) {
    if (!this.running) return;
    
    if (this.lastTimestamp !== null) {
      const deltaTime = timestamp - this.lastTimestamp;
      this.update(deltaTime);
    }
    this.lastTimestamp = timestamp;
    
    this.rafId = requestAnimationFrame((ts) => this.loop(ts));
  }
  
  pause() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }
  
  resume() {
    this.running = true;
    this.lastTimestamp = null; // Reset to avoid time jump
    this.rafId = requestAnimationFrame((ts) => this.loop(ts));
  }
}
```

---

## Skill Maintenance

Update this skill when:
- New simulation features are added
- New edge cases are discovered
- Timing or state machine patterns change
- User feedback reveals safety gaps

Version history tracked in `/.claude/skill-evolution-log.md`.
