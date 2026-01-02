export type CoinColor = "blue" | "green";
export type SlotId =
  | "L1"
  | "L2"
  | "L3"
  | "R1"
  | "R2"
  | "R3"
  | "C1"
  | "C2"
  | "C3"
  | "P1";

export interface GameState {
  positions: Record<SlotId, CoinColor | null>;
  moveCount: number;
  isWin: boolean;
}

const ADJACENCY: Record<SlotId, SlotId[]> = {
  L1: ["L2"],
  L2: ["L1", "L3", "C1"],
  L3: ["L2"],
  R1: ["R2"],
  R2: ["R1", "R3", "C3"],
  R3: ["R2"],
  C1: ["L2", "C2"],
  C2: ["C1", "C3", "P1"],
  C3: ["C2", "R2"],
  P1: ["C2"],
};

export const getInitialState = (): GameState => {
  return {
    positions: {
      L1: "blue",
      L2: "blue",
      L3: "blue",
      R1: "green",
      R2: "green",
      R3: "green",
      C1: null,
      C2: null,
      C3: null,
      P1: null,
    },
    moveCount: 0,
    isWin: false,
  };
};

export const isValidMove = (from: SlotId, to: SlotId): boolean => {
  return ADJACENCY[from].includes(to);
};

export const moveCoin = (
  state: GameState,
  from: SlotId,
  to: SlotId
): GameState => {
  const coin = state.positions[from];
  const target = state.positions[to];

  if (coin && target === null && isValidMove(from, to)) {
    const newPositions = { ...state.positions, [from]: null, [to]: coin };
    return {
      ...state,
      positions: newPositions,
      moveCount: state.moveCount + 1,
      isWin: isWin(newPositions),
    };
  }

  return state;
};

export const isWin = (positions: Record<SlotId, CoinColor | null>): boolean => {
  return (
    positions.L1 === "green" &&
    positions.L2 === "green" &&
    positions.L3 === "green" &&
    positions.R1 === "blue" &&
    positions.R2 === "blue" &&
    positions.R3 === "blue"
  );
};
