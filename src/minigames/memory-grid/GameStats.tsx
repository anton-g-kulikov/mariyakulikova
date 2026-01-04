import React from "react";
import { theme } from "../../theme";

interface GameStatsProps {
  lives: number;
  totalLives: number;
  score: number;
  phase: "memorizing" | "recalling" | "won" | "lost";
  memorizeTimeLeft: number;
  recallTime: number;
  levelName: string;
}

export const GameStats: React.FC<GameStatsProps> = ({
  lives,
  totalLives,
  score,
  phase,
  memorizeTimeLeft,
  recallTime,
  levelName,
}) => {
  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(1);
    return `${seconds}с`;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto 20px",
        padding: "10px clamp(10px, 4vw, 20px)",
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        boxShadow: `0 4px 0 ${theme.colors.shadow}`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          minWidth: "fit-content",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2px",
            fontSize: "clamp(16px, 5vw, 18px)",
          }}
        >
          {Array.from({ length: totalLives }).map((_, i) => (
            <span key={i} style={{ opacity: i < lives ? 1 : 0.3 }}>
              ❤️
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: "clamp(16px, 5vw, 18px)",
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          ⭐ {score}
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
          flex: "1",
          minWidth: "fit-content",
        }}
      >
        <div
          style={{
            fontSize: "clamp(14px, 4vw, 14px)",
            color: theme.colors.text,
            opacity: 0.7,
            whiteSpace: "nowrap",
          }}
        >
          {levelName}
        </div>
        <div
          style={{
            fontSize: "clamp(18px, 6vw, 20px)",
            fontWeight: "bold",
            color: theme.colors.heading,
          }}
        >
          {phase === "memorizing" ? (
            <span style={{ color: "#ef4444" }}>⏱️ {memorizeTimeLeft}с</span>
          ) : (
            <span>⏱️ {formatTime(recallTime)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
