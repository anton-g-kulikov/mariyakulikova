# Mini-Game Design Document: Sequential Memory Grid

## 1. Objective
Test and train short-term visual memory by requiring the player to recall and select numbered grid positions in the correct sequence after a brief exposure period.

---

## 2. Core Gameplay
1. A grid is displayed with a subset of cells containing numbers.
2. Numbers are visible for a limited time.
3. All cells are then masked.
4. The player must click the cells that previously contained numbers, **in ascending numerical order**.

---

## 3. Field Configurations
| Mode   | Grid Size | Numbers Shown |
|--------|-----------|---------------|
| Easy   | 5×5       | 5             |
| Medium | 5×6       | 7             |
| Hard   | 5×7       | 10            |

---

## 4. Timing Rules
- Number visibility duration (configurable per difficulty):
  - Easy: 10 seconds
  - Medium: 15 seconds
  - Hard: 20 seconds
- Masking occurs immediately after the timer ends.

---

## 5. Number Placement
- Numbers are sequential (e.g., 1…N).
- Positions are selected randomly at the start of each round.
- No overlapping cells.
- Each round uses a new random layout.

---

## 6. Player Interaction
- Player clicks on masked cells.
- Each click is validated against the expected next number in the sequence.
- **Correct click:**
  - Cell is revealed.
  - Progress advances to the next number.
- **Incorrect click:**
  - Immediate failure **or**
  - Strike/penalty system (configurable).

---

## 7. Win / Loss Conditions
- **Win:** All numbered cells are correctly selected in order.
- **Loss:**
  - Clicking an incorrect cell, or
  - Optionally exceeding a maximum number of allowed mistakes.

---

## 8. Scoring (Optional)
- Base score for successful completion.
- Time bonus for faster completion after masking.
- Perfect bonus for zero mistakes.

---

## 9. Difficulty Scaling (Optional Extensions)
- Reduced number visibility time.
- Larger grids.
- Non-linear or gapped numbering (e.g., skipping numbers).
- Reverse order mode (highest to lowest).

---

## 10. Technical Notes
- Grid implemented as a 2D array.
- Store a mapping of `number → cell position` before masking.
- Maintain a `currentExpectedNumber` state.
- Optional deterministic random seed for replay or debugging.

---

## 11. Success Criteria
- Rules are immediately understandable without tutorial text.
- Average round duration under 60 seconds.
- Clear visual and audio feedback for correct and incorrect actions.