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
      <h3 style={{ marginTop: 0 }}>Правила</h3>
      <p>Поменяй местами синие и зеленые монеты, перемещая их по полю.</p>

      <h3>Управление</h3>
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
