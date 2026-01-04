import React from "react";
import { GridCell } from "./GridCell";
import { CellData, GamePhase } from "./logic";

interface GridBoardProps {
  cells: CellData[];
  width: number;
  height: number;
  phase: GamePhase;
  onCellClick: (id: number) => void;
}

export const GridBoard: React.FC<GridBoardProps> = ({
  cells,
  width,
  height,
  phase,
  onCellClick,
}) => {
  const cellSize = "clamp(45px, 12vw, 60px)";
  const gap = "clamp(5px, 2vw, 10px)";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, ${cellSize})`,
        gridTemplateRows: `repeat(${height}, ${cellSize})`,
        gap,
        padding: "clamp(10px, 3vw, 15px)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: "20px",
        justifyContent: "center",
        margin: "0 auto",
        width: "fit-content",
        boxSizing: "border-box",
      }}
    >
      {cells.map((cell) => (
        <GridCell
          key={cell.id}
          value={cell.value}
          isRevealed={cell.isRevealed}
          isError={cell.isError}
          isCorrectOrder={cell.isCorrectOrder}
          phase={phase}
          onClick={() => onCellClick(cell.id)}
        />
      ))}
    </div>
  );
};
