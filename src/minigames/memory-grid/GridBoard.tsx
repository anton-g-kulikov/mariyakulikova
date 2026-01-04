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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, 60px)`,
        gridTemplateRows: `repeat(${height}, 60px)`,
        gap: "10px",
        padding: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: "20px",
        justifyContent: "center",
        margin: "0 auto",
        width: "fit-content",
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
