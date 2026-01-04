import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components";
import { MemoryGrid } from "../minigames/memory-grid/MemoryGrid";
import { theme } from "../theme";

export const MemoryGridPage: React.FC = () => {
  useEffect(() => {
    document.title = "Запоминалка 🧠";
  }, []);

  return (
    <PageContainer>
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: "20px",
          textAlign: "left",
        }}
      >
        <Link
          to="/"
          style={{
            color: theme.colors.primary,
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          🏠 На главную
        </Link>
      </div>
      <MemoryGrid />
    </PageContainer>
  );
};
