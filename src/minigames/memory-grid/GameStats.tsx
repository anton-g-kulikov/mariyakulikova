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
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto 20px",
        padding: "10px 20px",
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        boxShadow: `0 4px 0 ${theme.colors.shadow}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", gap: "2px", fontSize: "18px" }}>
          {Array.from({ length: totalLives }).map((_, i) => (
            <span key={i} style={{ opacity: i < lives ? 1 : 0.3 }}>
              ❤️
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          ⭐ {score}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{ fontSize: "14px", color: theme.colors.text, opacity: 0.7 }}
        >
          {levelName}
        </div>
        <div
          style={{
            fontSize: "20px",
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
