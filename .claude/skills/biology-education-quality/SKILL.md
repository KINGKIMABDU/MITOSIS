---
name: biology-education-quality
version: 1.0.0
created: 2026-05-06
last_modified: 2026-05-06
description: Ensures mitosis educational content is scientifically accurate and clearly explained.
type: verification
scope: content, explanations, educational-text
triggers:
  - editing text content about mitosis
  - modifying phase descriptions
  - adding new educational explanations
  - reviewing biological accuracy
  - student-facing content changes
dependencies: []
conflicts: []
---

# Biology Education Quality Skill

## Purpose

This skill ensures all biological content in the MITOSIS project meets rigorous standards for scientific accuracy and educational clarity. It acts as a verification layer before any content-related changes are applied.

---

## Activation Criteria

Activate this skill when:
- User requests changes to explanatory text about mitosis
- Creating new educational content for any mitosis phase
- Modifying phase descriptions (Prophase, Prometaphase, Metaphase, Anaphase, Telophase, Cytokinesis)
- Adding quizzes, tooltips, or helper text with biological content
- Reviewing existing content for accuracy
- Student-facing text is being modified

---

## Core Responsibilities

### 1. Scientific Accuracy Verification

**Before any content change, verify:**

#### Mitosis Phase Accuracy Checklist

**Prophase:**
- Chromatin condenses into visible chromosomes (each with two sister chromatids)
- Nucleolus disappears
- Mitotic spindle begins to form from centrosomes
- Centrosomes begin to move to opposite poles
- Nuclear envelope remains intact (in most eukaryotes)

**Prometaphase:**
- Nuclear envelope fragments (breaks down)
- Spindle microtubules invade nuclear region
- Kinetochores form on centromeres
- Chromosomes begin attaching to spindle via kinetochore microtubules
- Some chromosomes remain unattached initially

**Metaphase:**
- All chromosomes aligned at metaphase plate (equatorial plane)
- Bipolar attachment: each sister chromatid attached to opposite pole
- Tension across chromosomes from opposing spindle forces
- Checkpoint proteins monitor proper attachment

**Anaphase:**
- Cohesin proteins cleaved (separase activated)
- Sister chromatids separate (become daughter chromosomes)
- Kinetochore microtubules shorten (chromosomes pulled toward poles)
- Polar microtubules lengthen (push poles apart)
- Chromosomes move in a "V" shape (centromere first)

**Telophase:**
- Chromosomes arrive at opposite poles
- Nuclear envelopes re-form around each chromosome set
- Chromosomes decondense back to chromatin
- Nucleoli reappear
- Spindle apparatus disassembles

**Cytokinesis:**
- Cytoplasm divides (contractile ring of actin-myosin)
- In animal cells: cleavage furrow forms and pinches
- In plant cells: cell plate forms from Golgi vesicles
- Results in two genetically identical daughter cells

#### Common Misconceptions to Avoid

| Misconception | Correction |
|--------------|------------|
| Chromosomes duplicate during mitosis | DNA replicates in S phase (before mitosis begins) |
| Sister chromatids are different | They are identical copies (barring mutation) |
| Mitosis produces 4 cells | Mitosis + Cytokinesis produces 2 identical diploid cells |
| Spindle fibers pull chromosomes | Kinetochore microtubules shorten, chromosomes move |
| Chromosomes are "X" shaped | Only after replication; single chromatid before S phase |
| Cytokinesis is part of mitosis | Cytokinesis is separate but overlapping process |
| All cells undergo cytokinesis simultaneously | Timing can vary between cell types |

### 2. Educational Clarity Standards

**Readability Requirements:**
- Flesch Reading Ease: 60-70 (appropriate for high school/undergraduate)
- Sentence length: Average 15-20 words
- Paragraph length: Maximum 3-4 sentences for key concepts
- Active voice preferred over passive
- Technical terms must be defined on first use

**Scaffolding Pattern:**
1. Introduce concept with analogy or familiar reference
2. Define technical terminology
3. Explain mechanism/process
4. Connect to bigger picture (why it matters)
5. Common mistake/misconception callout (if applicable)

**Terminology Consistency:**
- Always use "chromatid" for single strand, "chromosome" for replicated pair
- "Spindle fibers" or "microtubules" (be consistent within context)
- "Daughter cells" not "child cells"
- "Centromere" not "centrosome" (different structures!)
- "Kinetochore" (protein structure) vs "centromere" (DNA region)

### 3. Content Review Protocol

When user requests content changes, follow this protocol:

```
STEP 1: READ
- Read the current content entirely
- Identify which mitosis phase is being described
- Note all technical terms used

STEP 2: VERIFY
- Cross-check each biological claim against standard curriculum
- Flag any inaccurate statements
- Identify missing critical information

STEP 3: CLARITY CHECK
- Assess readability (sentence length, paragraph structure)
- Check if terms are properly defined
- Verify logical flow (simple → complex)

STEP 4: ENHANCEMENT (if requested)
- Suggest analogies for difficult concepts
- Propose visual description enhancements
- Recommend scaffolding improvements

STEP 5: APPLY
- Make minimal invasive edits
- Preserve existing accurate content
- Only modify what user explicitly requested
```

---

## Verification Rules

### Rule 1: No Unsourced Claims
Any biological claim must be verifiable in standard textbooks:
- Campbell Biology
- Alberts' Molecular Biology of the Cell
- Raven & Johnson's Biology
- OpenStax Biology (free online resource)

### Rule 2: Phase Boundaries Respect
Do not blur distinctions between phases. Each phase has defining characteristics that must be preserved.

### Rule 3: Visual-Text Alignment
Text descriptions must match what animations/simulations show. If animation shows chromatids separating in anaphase, text must describe the same.

### Rule 4: Curriculum Alignment
Content should align with:
- NGSS HS-LS1-4 (High School Life Science)
- AP Biology Unit 4 (Cell Communication and Cell Cycle)
- IB Biology Topic 1.4 (Cell Division)

### Rule 5: No Dumbing Down
Scientific accuracy takes precedence over simplicity. Use proper terminology with clear definitions rather than oversimplifying.

---

## Output Format

When this skill is activated, provide:

### For Content Review:
```
## Biology Education Quality Review

### Accuracy Assessment
✓/✗ [Specific claim] - [Explanation]

### Clarity Assessment
✓/✗ [Readability/Scaffolding issue] - [Suggestion]

### Terminology Check
✓/✗ [Term usage] - [Correction if needed]

### Recommendations
1. [Actionable recommendation]
2. [Actionable recommendation]
```

### For Content Creation:
```
## Biology Education Quality - Content Draft

### Phase: [Prophase/Metaphase/etc.]
### Target Audience: [High School/Undergraduate]
### Key Concepts Covered:
- [Concept 1]
- [Concept 2]

### Content:
[The actual content]

### Accompanying Visual Suggestions:
- [Visual element 1]
- [Visual element 2]

### Common Misconception Addressed:
- [Misconception]
```

---

## Integration with Other Skills

- **simulation-safety**: Coordinate when text describes simulation behavior
- **animation-consistency**: Ensure text matches animated content
- **educational-ui-builder**: Provide content for new UI components
- **regression-verifier**: Verify content changes don't break quizzes/tests

---

## Examples

### Example 1: Content Correction

**User Input**: "Change prophase description to say chromosomes duplicate"

**Skill Response**:
```
⚠️ BIOLOGY EDUCATION QUALITY ALERT

The requested change contains a scientific inaccuracy:

INACCURACY: "Chromosomes duplicate during prophase"
CORRECTION: Chromosomes (DNA) duplicate during S phase of interphase, 
            BEFORE mitosis begins. Prophase is when condensed chromosomes 
            become visible.

SUGGESTED ACCURATE TEXT:
"During prophase, the chromosomes that were duplicated in S phase 
condense and become visible under a microscope. Each chromosome 
consists of two identical sister chromatids joined at the centromere."

Shall I use the corrected version?
```

### Example 2: Content Enhancement

**User Input**: "Add explanation of metaphase checkpoint"

**Skill Response**:
```
## Biology Education Quality - Content Draft

### Phase: Metaphase
### Concept: Spindle Assembly Checkpoint (Metaphase Checkpoint)

### Content:

The metaphase checkpoint (also called the spindle assembly checkpoint) 
is a critical quality control mechanism that ensures chromosomes are 
properly attached to the spindle before anaphase begins.

**How it works:**
- Proteins at the kinetochore (such as Mad2 and BubR1) monitor 
  attachment status
- If a chromosome lacks proper bipolar attachment, the checkpoint 
  signals "NOT READY"
- Anaphase inhibitor (securin) is degraded only when ALL chromosomes 
  are properly aligned
- This prevents aneuploidy (abnormal chromosome number) in daughter cells

**Why it matters:** Failure of this checkpoint can lead to genetic 
disorders or cancer. It's a key tumor suppressor mechanism.

### Visual Suggestion:
Diagram showing checkpoint proteins (green flags) on unattached 
chromosomes turning to red (ready) when properly attached.

### Curriculum Alignment: AP Biology LO 3.13 (Cell Cycle)
```

---

## Skill Maintenance

This skill should be updated when:
- New curriculum standards are released
- Scientific consensus changes on terminology
- User feedback indicates clarity issues
- New common misconceptions are identified

Version history and changes are tracked in `/.claude/skill-evolution-log.md`.
