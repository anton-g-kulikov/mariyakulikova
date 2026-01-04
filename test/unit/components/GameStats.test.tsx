import React from "react";
import { render, screen } from "@testing-library/react";
import { GameStats } from "../../../src/minigames/memory-grid/GameStats";
import { theme } from "../../../src/theme";
import "@testing-library/jest-dom";

describe("GameStats Component", () => {
  const defaultProps = {
    lives: 3,
    totalLives: 5,
    score: 10,
    phase: "recalling" as const,
    memorizeTimeLeft: 0,
    recallTime: 12300,
    levelName: "Уровень 2: Посложнее",
  };

  it("renders lives, score, level name and time", () => {
    render(<GameStats {...defaultProps} />);

    // Check lives (hearts)
    const hearts = screen.getAllByText("❤️");
    expect(hearts.length).toBe(5);

    // Check score
    expect(screen.getByText(/10/)).toBeInTheDocument();

    // Check level name
    expect(screen.getByText("Уровень 2: Посложнее")).toBeInTheDocument();

    // Check time (12.3s)
    expect(screen.getByText(/12.3с/)).toBeInTheDocument();
  });

  it("renders memorization timer when in memorizing phase", () => {
    render(
      <GameStats {...defaultProps} phase="memorizing" memorizeTimeLeft={5} />
    );
    expect(screen.getByText(/5с/)).toBeInTheDocument();
  });
});
