import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../theme";

interface GridCellProps {
  value: number | null;
  isRevealed: boolean;
  isError: boolean;
  isCorrectOrder?: boolean;
  phase: "memorizing" | "recalling" | "won" | "lost";
  onClick: () => void;
}

export const GridCell: React.FC<GridCellProps> = ({
  value,
  isRevealed,
  isError,
  isCorrectOrder,
  phase,
  onClick,
}) => {
  const showValue = phase === "memorizing" || isRevealed || phase === "lost";
  const isInteractive = phase === "recalling" && !isRevealed;

  let bgColor = theme.colors.primary;
  let shadowColor = theme.colors.primaryDark;

  if (showValue) {
    bgColor = theme.colors.white;
    shadowColor = "#e5e7eb";

    if (isRevealed && value !== null) {
      if (isCorrectOrder) {
        bgColor = "#dcfce7"; // green-100
        shadowColor = "#bbf7d0"; // green-200
      } else {
        bgColor = "#ffedd5"; // orange-100
        shadowColor = "#fed7aa"; // orange-200
      }
    }
  }

  return (
    <motion.div
      onClick={isInteractive ? onClick : undefined}
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: bgColor,
        borderRadius: theme.borderRadius.sm,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "bold",
        color: theme.colors.text,
        cursor: isInteractive ? "pointer" : "default",
        boxShadow: `0 4px 0 ${shadowColor}`,
        position: "relative",
        userSelect: "none",
      }}
      whileHover={isInteractive ? { scale: 1.05 } : {}}
      whileTap={isInteractive ? { scale: 0.95, y: 2 } : {}}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {showValue && value !== null && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
