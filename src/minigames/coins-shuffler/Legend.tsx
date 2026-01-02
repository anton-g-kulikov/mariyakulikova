import React from "react";

export const Legend: React.FC = () => {
  return (
    <div
      className="legend"
      style={{
        padding: "15px",
        border: "1px solid #444",
        borderRadius: "8px",
        backgroundColor: "#111",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Rules</h3>
      <p>Switch the blue and green coins by sliding them inside the board.</p>

      <h3>Controls</h3>
      <ul style={{ paddingLeft: "20px" }}>
        <li>
          <strong>Touch/Mouse:</strong> Drag a coin to an adjacent empty slot.
        </li>
        <li>
          <strong>Keyboard:</strong>
          <ul style={{ paddingLeft: "15px" }}>
            <li>Arrow keys to move focus.</li>
            <li>Space/Enter to lock/unlock a coin.</li>
            <li>Arrow keys to move a locked coin.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
