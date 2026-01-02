import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        backgroundColor: "#f6faff",
        color: "#333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Маша и папа 💜</h1>
      <nav style={{ marginTop: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/coins-shuffler"
              style={{
                color: "#4a90e2",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              🎮 Головоломка
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <a
              href="/august2025/presentation.html"
              style={{
                color: "#7ed321",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              📊 Август 2025
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
