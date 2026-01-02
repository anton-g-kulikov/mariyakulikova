import {
  getInitialState,
  isValidMove,
  moveCoin,
  isWin,
} from "../../src/minigames/coins-shuffler/logic";

describe("Coins Shuffler Logic", () => {
  test("SHUFFLE-TEST-001: Board Adjacency Logic", () => {
    // L2 is adjacent to C1, L1, L3
    expect(isValidMove("L2", "C1")).toBe(true);
    expect(isValidMove("L2", "L1")).toBe(true);
    expect(isValidMove("L2", "L3")).toBe(true);
    // L2 is NOT adjacent to C2, R2, etc.
    expect(isValidMove("L2", "C2")).toBe(false);
    expect(isValidMove("L2", "R2")).toBe(false);

    // C2 is adjacent to C1, C3, P1
    expect(isValidMove("C2", "C1")).toBe(true);
    expect(isValidMove("C2", "C3")).toBe(true);
    expect(isValidMove("C2", "P1")).toBe(true);
  });

  test("SHUFFLE-TEST-002: Valid Move Execution", () => {
    const state = getInitialState();
    // Initially L2 has a Blue coin, C1 is empty
    const newState = moveCoin(state, "L2", "C1");
    expect(newState.positions["L2"]).toBe(null);
    expect(newState.positions["C1"]).toBe("blue");
    expect(newState.moveCount).toBe(1);
  });

  test("SHUFFLE-TEST-007: Move Counter Logic", () => {
    let state = getInitialState();
    state = moveCoin(state, "L2", "C1");
    state = moveCoin(state, "C1", "C2");
    expect(state.moveCount).toBe(2);

    // Invalid move should not increment counter
    const invalidState = moveCoin(state, "C2", "R1"); // Not adjacent
    expect(invalidState.moveCount).toBe(2);
  });

  test("SHUFFLE-TEST-003: Win Condition Detection", () => {
    const winPositions: Record<string, any> = {
      L1: "green",
      L2: "green",
      L3: "green",
      R1: "blue",
      R2: "blue",
      R3: "blue",
      C1: null,
      C2: null,
      C3: null,
      P1: null,
    };
    expect(isWin(winPositions as any)).toBe(true);

    const initialPositions = getInitialState().positions;
    expect(isWin(initialPositions)).toBe(false);
  });
});
