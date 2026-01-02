import React from "react";
import { Link } from "react-router-dom";
import { CoinsShuffler } from "../minigames/coins-shuffler/CoinsShuffler";

export const CoinsShufflerPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#fdf2f8", minHeight: "100vh" }}>
      <div style={{ padding: "15px 20px" }}>
        <Link
          to="/"
          style={{
            color: "#db2777",
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
      <CoinsShuffler />
    </div>
  );
};
