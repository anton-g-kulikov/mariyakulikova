import React from "react";
import { motion } from "framer-motion";
import { CoinColor } from "./logic";
import { LevelConfig, SlotId } from "./levels";

interface GameBoardProps {
  levelConfig: LevelConfig;
  positions: Record<SlotId, CoinColor | null>;
  onMove: (from: SlotId, to: SlotId) => void;
  onSelectSlot: (slot: SlotId) => void;
  focusedSlot: SlotId | null;
  selectedSlot: SlotId | null;
  isMobile: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  levelConfig,
  positions,
  onMove,
  onSelectSlot,
  focusedSlot,
  selectedSlot,
  isMobile,
}) => {
  const slotCoords = isMobile
    ? levelConfig.slotCoordsMobile
    : levelConfig.slotCoordsDesktop;
  const boardPath = isMobile
    ? levelConfig.boardPathMobile
    : levelConfig.boardPathDesktop;

  const selectedColor = selectedSlot ? positions[selectedSlot] : null;
  const availableTargets: SlotId[] =
    selectedSlot && positions[selectedSlot]
      ? (levelConfig.adjacency[selectedSlot] || []).filter(
          (id) => positions[id] === null
        )
      : [];

  return (
    <div
      style={{
        width: isMobile
          ? `${levelConfig.widthMobile}px`
          : `${levelConfig.widthDesktop}px`,
        height: isMobile
          ? `${levelConfig.heightMobile}px`
          : `${levelConfig.heightDesktop}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <svg
        width={isMobile ? levelConfig.widthMobile : levelConfig.widthDesktop}
        height={isMobile ? levelConfig.heightMobile : levelConfig.heightDesktop}
        viewBox={
          isMobile ? levelConfig.viewBoxMobile : levelConfig.viewBoxDesktop
        }
        style={{
          flexShrink: 0,
        }}
      >
        {/* Board Outline */}
        <path d={boardPath} fill="#fff" stroke="#db2777" strokeWidth="4" />

        {/* Slots */}
        {(Object.keys(slotCoords) as SlotId[]).map((id) => (
          <g key={id}>
            <rect
              data-testid={`slot-${id}`}
              x={slotCoords[id].x - 40}
              y={slotCoords[id].y - 40}
              width="80"
              height="80"
              fill="transparent"
              stroke={
                focusedSlot === id || selectedSlot === id
                  ? "#facc15"
                  : "transparent"
              }
              strokeWidth={
                selectedSlot === id ? "6" : focusedSlot === id ? "3" : "0"
              }
              rx="10"
            />
          </g>
        ))}

        {/* Coins */}
        {(Object.entries(positions) as [SlotId, CoinColor | null][]).map(
          ([id, color]) => {
            if (!color) return null;
            return (
              <motion.circle
                key={id}
                data-testid={`coin-${id}`}
                role="img"
                aria-label={`${
                  color === "blue" ? "синяя" : "зеленая"
                } монета в ${id}`}
                cx={slotCoords[id].x}
                cy={slotCoords[id].y}
                r="35"
                fill={color === "blue" ? "#06b6d4" : "#84cc16"}
                stroke="#fff"
                strokeWidth="3"
                onClick={() => onSelectSlot(id)}
                whileHover={{ scale: 1.1 }}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            );
          }
        )}

        {/* Move Dots */}
        {selectedSlot &&
          selectedColor &&
          availableTargets.map((target) => (
            <circle
              key={`dot-${target}`}
              data-testid={`move-dot-${target}`}
              cx={slotCoords[target].x}
              cy={slotCoords[target].y}
              r="10"
              fill={selectedColor === "blue" ? "#06b6d4" : "#84cc16"}
              stroke="#fff"
              strokeWidth="3"
              onClick={() => onMove(selectedSlot, target)}
              style={{ cursor: "pointer" }}
            />
          ))}
      </svg>
    </div>
  );
};
