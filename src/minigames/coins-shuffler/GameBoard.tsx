import React from "react";
import { motion } from "framer-motion";
import { SlotId, CoinColor } from "./logic";

interface GameBoardProps {
  positions: Record<SlotId, CoinColor | null>;
  onMove: (from: SlotId, to: SlotId) => void;
  focusedSlot: SlotId | null;
  selectedSlot: SlotId | null;
  isMobile: boolean;
}

export const SLOT_COORDS_DESKTOP: Record<SlotId, { x: number; y: number }> = {
  L1: { x: 50, y: 50 },
  L2: { x: 50, y: 130 },
  L3: { x: 50, y: 210 },
  C1: { x: 130, y: 130 },
  C2: { x: 210, y: 130 },
  C3: { x: 290, y: 130 },
  R1: { x: 370, y: 50 },
  R2: { x: 370, y: 130 },
  R3: { x: 370, y: 210 },
  P1: { x: 210, y: 50 },
};

export const SLOT_COORDS_MOBILE: Record<SlotId, { x: number; y: number }> = {
  L1: { x: 50, y: 50 },
  L2: { x: 130, y: 50 },
  L3: { x: 210, y: 50 },
  C1: { x: 130, y: 130 },
  C2: { x: 130, y: 210 },
  C3: { x: 130, y: 290 },
  R1: { x: 50, y: 370 },
  R2: { x: 130, y: 370 },
  R3: { x: 210, y: 370 },
  P1: { x: 50, y: 210 },
};

const BOARD_PATH_DESKTOP =
  "M 10,10 H 90 V 90 H 170 V 10 H 250 V 90 H 330 V 10 H 410 V 250 H 330 V 170 H 90 V 250 H 10 Z";
const BOARD_PATH_MOBILE =
  "M 10,10 H 250 V 90 H 170 V 330 H 250 V 410 H 10 V 330 H 90 V 250 H 10 V 170 H 90 V 90 H 10 Z";

export const GameBoard: React.FC<GameBoardProps> = ({
  positions,
  onMove,
  focusedSlot,
  selectedSlot,
  isMobile,
}) => {
  const slotCoords = isMobile ? SLOT_COORDS_MOBILE : SLOT_COORDS_DESKTOP;
  const boardPath = isMobile ? BOARD_PATH_MOBILE : BOARD_PATH_DESKTOP;

  const handleDragEnd = (from: SlotId, info: any) => {
    // Find the nearest slot
    let nearestSlot: SlotId | null = null;
    let minDistance = Infinity;

    // We need to convert screen coordinates to SVG coordinates or use relative drag distance
    // For simplicity, let's use the drag offset to find the target slot
    const dragX = info.offset.x;
    const dragY = info.offset.y;

    // Note: We do NOT need to manually rotate coordinates for mobile here.
    // The SVG container is rotated via CSS transform, and framer-motion's drag
    // logic operates in the local coordinate space of the element.
    // So dragging "Down" on screen (along the rotated X-axis) correctly reports
    // as an X-offset in the local space, which matches our board logic.

    const currentCoord = slotCoords[from];
    const targetX = currentCoord.x + dragX;
    const targetY = currentCoord.y + dragY;

    (Object.keys(slotCoords) as SlotId[]).forEach((id) => {
      if (id === from) return;
      const slot = slotCoords[id];
      const dist = Math.sqrt(
        Math.pow(slot.x - targetX, 2) + Math.pow(slot.y - targetY, 2)
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearestSlot = id;
      }
    });

    // Trigger movement if we are within 65 units of another slot
    // (Since slots are 80 units apart, this means after ~15 units of drag)
    if (nearestSlot && minDistance < 65) {
      onMove(from, nearestSlot);
    }
  };

  return (
    <div
      style={{
        width: isMobile ? "260px" : "420px",
        height: isMobile ? "420px" : "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <svg
        width={isMobile ? "260" : "420"}
        height={isMobile ? "420" : "260"}
        viewBox={isMobile ? "0 0 260 420" : "0 0 420 260"}
        style={{
          flexShrink: 0,
        }}
      >
        {/* Board Outline */}
        <path
          d={boardPath}
          fill="none"
          stroke="#fff"
          strokeWidth="2"
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
              stroke={focusedSlot === id ? "#ffeb3b" : "transparent"}
              strokeWidth={focusedSlot === id ? "2" : "0"}
            />
            {selectedSlot === id && (
              <rect
                x={slotCoords[id].x - 42}
                y={slotCoords[id].y - 42}
                width="84"
                height="84"
                fill="none"
                stroke="#9c27b0"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
            )}
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
                aria-label={`${color} coin at ${id}`}
                cx={slotCoords[id].x}
                cy={slotCoords[id].y}
                r="35"
                fill={color === "blue" ? "#4a90e2" : "#7ed321"}
                stroke="#fff"
                strokeWidth="2"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => handleDragEnd(id, info)}
                whileHover={{ scale: 1.1 }}
                whileDrag={{ scale: 1.2, zIndex: 10 }}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            );
          }
        )}
      </svg>
    </div>
  );
};
