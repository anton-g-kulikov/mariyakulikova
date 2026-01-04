import {
  generateGrid,
  startNewGame,
  handleCellClick,
  INITIAL_LIVES,
} from "../../src/minigames/memory-grid/logic";

describe("Memory Grid Logic", () => {
  test("generateGrid creates correct number of cells and values", () => {
    const width = 5;
    const height = 5;
    const numberCount = 5;
    const cells = generateGrid(width, height, numberCount);

    expect(cells.length).toBe(width * height);
    const numberedCells = cells.filter((c) => c.value !== null);
    expect(numberedCells.length).toBe(numberCount);

    const values = numberedCells.map((c) => c.value).sort((a, b) => a! - b!);
    expect(values).toEqual([1, 2, 3, 4, 5]);
  });

  test("startNewGame initializes state correctly", () => {
    const state = startNewGame(5, 5, 5, 10, 3);
    expect(state.phase).toBe("memorizing");
    expect(state.lives).toBe(3);
    expect(state.score).toBe(0);
    expect(state.errors).toBe(0);
    expect(state.currentExpectedNumber).toBe(1);
    expect(state.memorizeTimeLeft).toBe(10);
  });

  test("handleCellClick works for correct sequence and scoring", () => {
    let state = startNewGame(5, 5, 3, 10, 3);
    state.phase = "recalling";

    // Click 1 (correct)
    const cell1 = state.cells.find((c) => c.value === 1)!;
    state = handleCellClick(state, cell1.id);
    expect(state.score).toBe(5);
    expect(state.errors).toBe(0);
    expect(state.currentExpectedNumber).toBe(2);

    // Click 2 (correct)
    const cell2 = state.cells.find((c) => c.value === 2)!;
    state = handleCellClick(state, cell2.id);
    expect(state.score).toBe(10);
    expect(state.errors).toBe(0);
    expect(state.currentExpectedNumber).toBe(3);

    // Click 3 (correct)
    const cell3 = state.cells.find((c) => c.value === 3)!;
    state = handleCellClick(state, cell3.id);
    expect(state.score).toBe(15);
    expect(state.errors).toBe(0);
    expect(state.phase).toBe("won");
  });

  test("handleCellClick handles out of order clicks and scoring", () => {
    let state = startNewGame(5, 5, 3, 10, 3);
    state.phase = "recalling";

    // Click 3 (out of order)
    const cell3 = state.cells.find((c) => c.value === 3)!;
    state = handleCellClick(state, cell3.id);
    expect(state.score).toBe(1);
    expect(state.errors).toBe(1);
    expect(state.lives).toBe(3); // Should NOT spend a heart
    expect(state.currentExpectedNumber).toBe(1); // Still expecting 1

    // Click 1 (correct)
    const cell1 = state.cells.find((c) => c.value === 1)!;
    state = handleCellClick(state, cell1.id);
    expect(state.score).toBe(6); // 1 + 5
    expect(state.errors).toBe(1);
    expect(state.currentExpectedNumber).toBe(2);

    // Click 2 (correct)
    const cell2 = state.cells.find((c) => c.value === 2)!;
    state = handleCellClick(state, cell2.id);
    expect(state.score).toBe(11); // 6 + 5
    expect(state.errors).toBe(1);
    expect(state.phase).toBe("won"); // 3 was already revealed
  });

  test("handleCellClick handles empty slots and lives", () => {
    let state = startNewGame(5, 5, 3, 10, 3);
    state.phase = "recalling";

    // Click empty slot
    const emptyCell = state.cells.find((c) => c.value === null)!;
    state = handleCellClick(state, emptyCell.id);
    expect(state.lives).toBe(2);
    expect(state.errors).toBe(1);
    expect(state.score).toBe(0);
    expect(state.cells.find((c) => c.id === emptyCell.id)?.isRevealed).toBe(
      true
    );
  });
});
