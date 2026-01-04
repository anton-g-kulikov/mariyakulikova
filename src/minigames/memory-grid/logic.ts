export type GamePhase = "memorizing" | "recalling" | "won" | "lost";

export interface CellData {
  id: number; // index in the flat array
  x: number;
  y: number;
  value: number | null; // 1..N or null
  isRevealed: boolean;
  isError: boolean;
  isCorrectOrder?: boolean;
}

export interface GameState {
  phase: GamePhase;
  cells: CellData[];
  currentExpectedNumber: number;
  lives: number;
  score: number;
  startTime: number; // timestamp when recall started
  endTime: number | null; // timestamp when game ended
  memorizeTimeLeft: number; // seconds
}

export const INITIAL_LIVES = 3;

export function generateGrid(
  width: number,
  height: number,
  numberCount: number
): CellData[] {
  const totalCells = width * height;
  const cells: CellData[] = [];

  // Initialize empty cells
  for (let i = 0; i < totalCells; i++) {
    cells.push({
      id: i,
      x: i % width,
      y: Math.floor(i / width),
      value: null,
      isRevealed: false,
      isError: false,
    });
  }

  // Randomly place numbers 1..numberCount
  const availableIndices = Array.from({ length: totalCells }, (_, i) => i);
  for (let n = 1; n <= numberCount; n++) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const cellIndex = availableIndices.splice(randomIndex, 1)[0];
    cells[cellIndex].value = n;
  }

  return cells;
}

export function startNewGame(
  width: number,
  height: number,
  numberCount: number,
  memorizeTime: number,
  lives: number
): GameState {
  return {
    phase: "memorizing",
    cells: generateGrid(width, height, numberCount),
    currentExpectedNumber: 1,
    lives: lives,
    score: 0,
    startTime: 0,
    endTime: null,
    memorizeTimeLeft: memorizeTime,
  };
}

export function handleCellClick(state: GameState, cellId: number): GameState {
  if (state.phase !== "recalling") return state;

  const cell = state.cells.find((c) => c.id === cellId);
  if (!cell || cell.isRevealed) return state;

  // Create new cells array with the clicked cell revealed
  const newCells = state.cells.map((c) =>
    c.id === cellId
      ? {
          ...c,
          isRevealed: true,
          isError: false,
          isCorrectOrder:
            c.value !== null && c.value === state.currentExpectedNumber,
        }
      : c
  );

  let newScore = state.score;
  let nextExpected = state.currentExpectedNumber;
  let newLives = state.lives;

  if (cell.value !== null) {
    // Clicked a number
    if (cell.value === nextExpected) {
      // Correct sequence
      newScore += 5;
      nextExpected++;

      // Auto-advance through already revealed numbers
      const totalNumbers = state.cells.filter((c) => c.value !== null).length;
      while (nextExpected <= totalNumbers) {
        const nextCell = newCells.find((c) => c.value === nextExpected);
        if (nextCell && nextCell.isRevealed) {
          nextExpected++;
        } else {
          break;
        }
      }
    } else {
      // Out of order
      newScore += 1;
    }
  } else {
    // Clicked an empty slot
    newLives -= 1;
  }

  // Check win/loss
  const totalNumbers = state.cells.filter((c) => c.value !== null).length;
  const revealedNumbers = newCells.filter(
    (c) => c.value !== null && c.isRevealed
  ).length;

  if (newLives <= 0) {
    return {
      ...state,
      cells: newCells,
      lives: 0,
      score: newScore,
      phase: "lost",
      endTime: Date.now(),
    };
  }

  if (revealedNumbers === totalNumbers) {
    return {
      ...state,
      cells: newCells,
      lives: newLives,
      score: newScore,
      phase: "won",
      endTime: Date.now(),
    };
  }

  return {
    ...state,
    cells: newCells,
    lives: newLives,
    score: newScore,
    currentExpectedNumber: nextExpected,
  };
}

export function clearCellError(state: GameState, cellId: number): GameState {
  return {
    ...state,
    cells: state.cells.map((c) =>
      c.id === cellId ? { ...c, isError: false } : c
    ),
  };
}
