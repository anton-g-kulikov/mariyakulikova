import React from "react";

export const Legend: React.FC = () => {
  return (
    <div
      className="legend"
      style={{
        padding: "15px",
        border: "3px solid #fbcfe8",
        borderRadius: "15px",
        backgroundColor: "#fff",
        color: "#4c1d95",
        fontSize: "14px",
        lineHeight: "1.6",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ marginTop: 0, color: "#db2777" }}>Правила</h3>
      <p>Поменяй местами синие и зеленые монеты, перемещая их по полю.</p>

      <h3 style={{ color: "#db2777" }}>Управление</h3>
      <ul style={{ paddingLeft: "20px" }}>
        <li>Перетащи монету в соседний пустой слот.</li>
        <li>
          <strong>Клавиатура:</strong>
          <ul style={{ paddingLeft: "15px" }}>
            <li>Стрелки для перемещения фокуса.</li>
            <li>Пробел/Enter для выбора/отмены выбора монеты.</li>
            <li>Стрелки для перемещения выбранной монеты.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
