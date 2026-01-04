import React, { useState, useEffect, useCallback, useRef } from "react";
import { Heading, Button, Card } from "../../components";
import { MEMORY_LEVELS, MemoryLevel } from "./levels";
import {
  GameState,
  startNewGame,
  handleCellClick,
  clearCellError,
} from "./logic";
import { GridBoard } from "./GridBoard";
import { GameStats } from "./GameStats";
import { theme } from "../../theme";

export const MemoryGrid: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [recallTime, setRecallTime] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);

  const currentLevel = MEMORY_LEVELS[currentLevelIdx];

  const startLevel = useCallback((level: MemoryLevel) => {
    const newState = startNewGame(
      level.gridWidth,
      level.gridHeight,
      level.numberCount,
      level.memorizeTime,
      level.lives
    );
    setGameState(newState);
    setRecallTime(0);
    setShowResultModal(false);
  }, []);

  // Result modal delay
  useEffect(() => {
    if (gameState?.phase === "won" || gameState?.phase === "lost") {
      const timer = setTimeout(() => {
        setShowResultModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResultModal(false);
    }
  }, [gameState?.phase]);

  // Memorization timer
  useEffect(() => {
    if (gameState?.phase !== "memorizing") return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (!prev || prev.phase !== "memorizing") return prev;
        if (prev.memorizeTimeLeft <= 1) {
          return {
            ...prev,
            phase: "recalling",
            memorizeTimeLeft: 0,
            startTime: Date.now(),
          };
        }
        return { ...prev, memorizeTimeLeft: prev.memorizeTimeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState?.phase]);

  // Recall stopwatch
  useEffect(() => {
    if (gameState?.phase !== "recalling") return;

    const timer = setInterval(() => {
      setRecallTime((prev) => prev + 100);
    }, 100);

    return () => clearInterval(timer);
  }, [gameState?.phase]);

  const onCellClick = (cellId: number) => {
    if (!gameState || gameState.phase !== "recalling") return;

    const newState = handleCellClick(gameState, cellId);
    setGameState(newState);
  };

  if (!gameState) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Heading>Запоминалка 🧠</Heading>
        <Card style={{ marginTop: "20px" }}>
          <p style={{ marginBottom: "20px", fontSize: "18px" }}>
            Запомни, где находятся числа, и нажми на них по порядку: 1, 2, 3...
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {MEMORY_LEVELS.map((level, idx) => (
              <Button
                key={level.id}
                onClick={() => {
                  setCurrentLevelIdx(idx);
                  startLevel(level);
                }}
                variant={idx === 0 ? "primary" : "secondary"}
              >
                {level.name}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <GameStats
        lives={gameState.lives}
        totalLives={currentLevel.lives}
        score={gameState.score}
        phase={gameState.phase}
        memorizeTimeLeft={gameState.memorizeTimeLeft}
        recallTime={recallTime}
        levelName={currentLevel.name}
      />

      <GridBoard
        cells={gameState.cells}
        width={currentLevel.gridWidth}
        height={currentLevel.gridHeight}
        phase={gameState.phase}
        onCellClick={onCellClick}
      />

      {showResultModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <Card style={{ maxWidth: "400px", width: "100%" }}>
            <Heading>
              {gameState.phase === "won" ? "Победа! 🎉" : "Ой! 🙊"}
            </Heading>
            <div style={{ fontSize: "20px", margin: "20px 0" }}>
              {gameState.phase === "won" ? (
                <p>Ты молодец!</p>
              ) : (
                <p>Попробуешь ещё раз?</p>
              )}
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: theme.colors.primary,
                  margin: "10px 0",
                }}
              >
                ⭐ Очки: {gameState.score}
              </p>
              <p>Время: {(recallTime / 1000).toFixed(1)}с</p>
              <p
                style={{
                  fontSize: "18px",
                  color: theme.colors.text,
                  opacity: 0.8,
                  marginTop: "5px",
                }}
              >
                Ошибки: {gameState.errors}
              </p>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Button onClick={() => startLevel(currentLevel)}>
                {gameState.phase === "won" ? "Играть снова" : "Повторить"}
              </Button>
              {gameState.phase === "won" &&
                currentLevelIdx < MEMORY_LEVELS.length - 1 && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const nextIdx = currentLevelIdx + 1;
                      setCurrentLevelIdx(nextIdx);
                      startLevel(MEMORY_LEVELS[nextIdx]);
                    }}
                  >
                    Следующий уровень
                  </Button>
                )}
              <Button variant="secondary" onClick={() => setGameState(null)}>
                В меню
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={() => setGameState(null)}>
          Сдаться 🏳️
        </Button>
      </div>
    </div>
  );
};
