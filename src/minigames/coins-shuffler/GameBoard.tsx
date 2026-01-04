import React from "react";
import { motion } from "framer-motion";
import { CoinColor } from "./logic";
import { LevelConfig, SlotId } from "./levels";
import { theme } from "../../theme";

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
        <path
          d={boardPath}
          fill={theme.colors.white}
          stroke={theme.colors.heading}
          strokeWidth="4"
        />

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
                  ? theme.colors.focus
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
                fill={color === "blue" ? theme.colors.blue : theme.colors.green}
                stroke={theme.colors.white}
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
            <g
              key={`dot-${target}`}
              onClick={() => onMove(selectedSlot, target)}
              style={{ cursor: "pointer" }}
            >
              <circle
                data-testid={`move-dot-hit-${target}`}
                cx={slotCoords[target].x}
                cy={slotCoords[target].y}
                r="33"
                fill={
                  selectedColor === "blue"
                    ? theme.colors.blue
                    : theme.colors.green
                }
                fillOpacity="0.001"
                stroke="none"
              />
              <circle
                data-testid={`move-dot-${target}`}
                cx={slotCoords[target].x}
                cy={slotCoords[target].y}
                r="10"
                fill={
                  selectedColor === "blue"
                    ? theme.colors.blue
                    : theme.colors.green
                }
                stroke={theme.colors.white}
                strokeWidth="3"
              />
            </g>
          ))}
      </svg>
    </div>
  );
};
