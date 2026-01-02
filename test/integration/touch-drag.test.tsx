import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CoinsShuffler } from "../../src/minigames/coins-shuffler/CoinsShuffler";
import "@testing-library/jest-dom";

describe("Tap-to-select move dots (Touch)", () => {
  test("shows dots after tap and moves coin on dot tap", () => {
    render(<CoinsShuffler />);

    // Tap coin S1 to select
    fireEvent.click(screen.getByTestId("coin-S1"));
    expect(screen.getByTestId("move-dot-S2")).toBeInTheDocument();

    // Tap the dot to move S1 -> S2
    fireEvent.click(screen.getByTestId("move-dot-S2"));

    expect(screen.getByText(/Ходы: 1/)).toBeInTheDocument();
    expect(screen.queryByTestId("coin-S1")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-S2")).toBeInTheDocument();
    // Dots disappear after move
    expect(screen.queryByTestId("move-dot-S3")).not.toBeInTheDocument();
  });

  test("mobile layout still allows tap-to-move with rotated coords", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CoinsShuffler />);

    fireEvent.click(screen.getByTestId("coin-S1"));
    expect(screen.getByTestId("move-dot-S2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("move-dot-S2"));

    expect(screen.getByText(/Ходы: 1/)).toBeInTheDocument();
    expect(screen.queryByTestId("coin-S1")).not.toBeInTheDocument();
    expect(screen.getByTestId("coin-S2")).toBeInTheDocument();
  });
});
