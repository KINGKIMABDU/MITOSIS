---
description: Provides a safe refactor protocol to ensure code changes remain functional and reversible.
name: safe-refactor-protocol
version: 1.0.0
created: 2026-05-06
last_modified: 2026-05-06
type: safety-protocol
scope: refactoring, code-changes, rollbacks, change-management
triggers:
  - user requests refactoring of existing code
  - modifying architecture or file structure
  - changing component patterns
  - renaming multiple files or symbols
  - altering data flow or state management
  - extracting or merging components
  - switching libraries or frameworks
dependencies: []
conflicts: []
---

# Safe Refactor Protocol Skill

## Purpose

This skill provides a strict protocol for all refactoring operations in the MITOSIS project. It ensures that code improvements never break existing functionality, and that any change can be rolled back safely. The educational website must remain functional at all times.

---

## Activation Criteria

Activate this skill when:
- User explicitly requests refactoring ("refactor", "clean up", "restructure")
- Changes affect more than 3 files simultaneously
- Modifying core architecture or file organization
- Renaming components, functions, or variables across multiple files
- Changing state management approach
- Extracting code into new modules
- Merging or splitting components
- Switching libraries, frameworks, or dependencies
- User says "optimize" or "improve structure"

---

## Core Philosophy

**"Working code is better than clean code."**

Refactoring is ONLY justified when:
1. There is a clear, specific problem to solve (not just "it looks messy")
2. The change improves maintainability WITHOUT breaking functionality
3. The user has explicitly requested it
4. There is a rollback plan

**NEVER refactor:**
- Working simulation logic "to make it cleaner"
- Working animation code "to modernize it"
- Educational content "to improve flow" (use biology-education-quality instead)
- Code you don't fully understand
- More than necessary to solve the stated problem

---

## The Safe Refactor Protocol

### Phase 1: UNDERSTAND (Mandatory)

Before ANY refactoring, document current state:

```
## Current State Documentation

### Files Affected:
- [file1.js] - [brief description of what it does]
- [file2.css] - [brief description of what it does]
- [file3.html] - [brief description of what it does]

### Current Behavior:
1. [Key behavior 1 - e.g., "Clicking play starts mitosis animation"]
2. [Key behavior 2 - e.g., "Phase transitions happen after X seconds"]
3. [Key behavior 3 - e.g., "Reset button clears all state"]

### Dependencies:
- [file1.js] depends on: [list dependencies]
- [file2.css] is used by: [list consumers]

### Known Working State:
- Last verified: [date or commit hash]
- Verification method: [manual test / automated test]
```

### Phase 2: PLAN (Mandatory)

Create a refactoring plan:

```
## Refactoring Plan

### Goal:
[What specific problem are we solving?]

### Changes:
1. [Change 1] → [Expected benefit]
2. [Change 2] → [Expected benefit]

### Files to Modify:
| File | Change Type | Risk Level |
|------|-------------|------------|
| [file1] | Modify | Low/Medium/High |
| [file2] | Delete | High |
| [file3] | Create | Medium |

### Rollback Plan:
If things go wrong:
1. [Step 1 - e.g., "git checkout -- file1.js"]
2. [Step 2 - e.g., "Restore file2.css from git history"]
3. [Step 3 - e.g., "npm install to restore dependencies"]

### Verification Steps:
After refactoring, verify:
□ [Behavior 1 still works]
□ [Behavior 2 still works]
□ [Behavior 3 still works]
□ No console errors
□ Animations still smooth (60fps)
□ Responsive layout still works
```

### Phase 3: BACKUP (Mandatory)

```
## Backup Created

BEFORE making changes:
1. Document current git status
2. Note: "If not in clean git state, commit or stash first"
3. For non-git files, copy to backup location: .claude/backups/[timestamp]/
```

**Implementation:**
```bash
# Check git status
git status

# If clean, create a backup tag
git tag -a "pre-refactor-[description]" -m "Backup before refactoring [description]"

# If dirty, warn user
# "You have uncommitted changes. Please commit or stash before refactoring."
```

### Phase 4: INCREMENTAL CHANGES (Mandatory)

**NEVER do a big-bang refactor. Break into small steps:**

```
Step 1: [Smallest possible change]
- Files changed: [list]
- Verify: [how to verify]
- Rollback: [how to undo]

[USER APPROVAL REQUIRED BEFORE CONTINUING]

Step 2: [Next small change]
- Files changed: [list]
- Verify: [how to verify]
- Rollback: [how to undo]

[USER APPROVAL REQUIRED BEFORE CONTINUING]

...etc
```

**Example - Renaming a component:**
```
Step 1: Create new component alongside old one (don't delete old yet)
  → Verify both work
  
Step 2: Update ONE consumer to use new component
  → Verify that consumer still works
  
Step 3: Update remaining consumers one-by-one
  → Verify each after update
  
Step 4: Delete old component
  → Final verification
```

### Phase 5: VERIFY (Mandatory)

After EACH step, run verification:

```javascript
// Functional Verification
□ Simulation starts correctly
□ All phase transitions work
□ Pause/Resume functions
□ Reset clears state
□ Speed control works
□ All buttons clickable
□ All links navigable

// Visual Verification  
□ No layout breaks
□ Animations smooth (check DevTools)
□ Colors consistent
□ Text readable
□ Responsive at all breakpoints

// Console Verification
□ No JavaScript errors
□ No CSS warnings
□ No 404s for assets
□ Network requests successful
```

### Phase 6: DOCUMENT (Mandatory)

After completing refactoring:

```
## Refactoring Complete

### Summary of Changes:
- [Change 1]
- [Change 2]

### Files Modified:
- [file1] - [what changed]
- [file2] - [what changed]

### New Files Created:
- [file3] - [purpose]

### Files Deleted:
- [file4] - [reason]

### Verification Results:
✓ All functional tests pass
✓ All visual checks pass
✓ No console errors
✓ Performance unchanged/degraded/improved

### Rollback Command (if needed):
git reset --hard pre-refactor-[description]
```

---

## Refactoring Decision Tree

```
User requests refactoring
│
├─ Is the code currently working?
│  ├─ NO → Fix bugs first, don't refactor
│  └─ YES → Continue
│
├─ Is the request specific?
│  ├─ NO ("clean up the code") → Ask for specific goals
│  └─ YES → Continue
│
├─ Is the benefit clear?
│  ├─ NO → Explain why refactoring may not be justified
│  └─ YES → Continue
│
├─ Affected files > 3 OR lines > 100?
│  ├─ YES → Use full Safe Refactor Protocol
│  └─ NO → May use simplified protocol (still backup first)
│
└─ Proceed with refactoring using protocol phases
```

---

## Red Flags (Stop and Warn)

Immediately warn user if they request:

1. **"Refactor everything"** → "Please specify which components need refactoring and why."
2. **"Modernize the codebase"** → "Modernization without specific goal risks breaking working code."
3. **"Make it cleaner"** → "Define what 'cleaner' means specifically. Working code is priority #1."
4. **Refactoring during active development** → "Complete current features before refactoring."
5. **"Rewrite in [new framework]"** → "Framework changes are high-risk. Justify with specific benefits."
6. **Refactoring without tests** → "Add verification steps. We need to verify behavior is preserved."

---

## Output Format

When this skill is active:

```
🔒 SAFE REFACTOR PROTOCOL ACTIVE

REFACTORING REQUEST: [User's request]

PHASE 1 - UNDERSTAND:
[Current state documentation]

PHASE 2 - PLAN:
[Refactoring plan with risk assessment]

PHASE 3 - BACKUP:
[Backup strategy]

PHASE 4 - INCREMENTAL CHANGES:
Step 1: [Description]
  Files: [list]
  Verify: [how]
  Rollback: [how]
  
[WAIT FOR USER APPROVAL]

Step 2: ...

PHASE 5 - VERIFY:
[Verification checklist results]

PHASE 6 - DOCUMENT:
[Summary of changes]
```

---

## Simplified Protocol (Small Changes)

For changes affecting ≤3 files AND ≤100 lines per file:

```
## Simplified Safe Refactor

1. BACKUP: Note current git status / create backup
2. CHANGE: Make the edit
3. VERIFY: Test the specific functionality changed
4. DOCUMENT: Note what changed

No need for elaborate planning if change is small and contained.
```

---

## Integration with Other Skills

- **simulation-safety**: Consult before refactoring simulation code
- **animation-consistency**: Verify animations after refactoring UI
- **biology-education-quality**: Verify content after refactoring explanations
- **educational-ui-builder**: Consult on UI component refactoring
- **regression-verifier**: Run after refactoring to catch regressions
- **component-reuse-enforcer**: Check reuse opportunities before refactoring

---

## Refactoring Patterns (Approved)

### Pattern 1: Extract Function
```javascript
// BEFORE
function simulateMitosis() {
  // 100 lines of code
}

// AFTER (safe extraction)
function simulateMitosis() {
  setupSpindle();
  alignChromosomes();
  separateChromatids();
  formDaughterCells();
}

// Each helper is tested independently
function setupSpindle() { /* ... */ }
function alignChromosomes() { /* ... */ }
// etc.
```

### Pattern 2: Component Extraction
```javascript
// BEFORE: One big component
class MitosisSimulation {
  render() { /* 200 lines */ }
}

// AFTER: Extract sub-components
class MitosisSimulation {
  render() {
    return `
      ${this.renderChromosomes()}
      ${this.renderSpindle()}
      ${this.renderControls()}
    `;
  }
  renderChromosomes() { /* extracted */ }
  renderSpindle() { /* extracted */ }
  renderControls() { /* extracted */ }
}
```

### Pattern 3: CSS Refactoring
```css
/* BEFORE: Hardcoded values everywhere */
.phase-card { background: #f0f0f8; color: #1a1a2e; }
.phase-header { background: #f0f0f8; color: #1a1a2e; }

/* AFTER: Design tokens */
.phase-card { background: var(--neutral-50); color: var(--neutral-900); }
.phase-header { background: var(--neutral-50); color: var(--neutral-900); }
```

---

## Skill Maintenance

Update this skill when:
- New refactoring patterns are adopted
- Tooling changes (linters, formatters)
- User feedback reveals protocol gaps
- New types of refactoring are needed

Version history tracked in `/.claude/skill-evolution-log.md`.
