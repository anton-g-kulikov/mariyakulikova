import React from "react";
import { Card, Heading } from "../../components";

export const Legend: React.FC = () => {
  return (
    <Card className="legend">
      <Heading level={3} style={{ marginTop: 0, textAlign: "left" }}>
        Правила
      </Heading>
      <p>Поменяй местами синие и зеленые монеты, перемещая их по полю.</p>

      <Heading level={3} style={{ textAlign: "left" }}>
        Управление
      </Heading>
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
    </Card>
  );
};
