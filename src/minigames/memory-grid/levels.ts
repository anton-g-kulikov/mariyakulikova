export interface MemoryLevel {
  id: number;
  name: string;
  gridWidth: number;
  gridHeight: number;
  numberCount: number;
  memorizeTime: number; // in seconds
  lives: number;
}

export const MEMORY_LEVELS: MemoryLevel[] = [
  {
    id: 1,
    name: "Уровень 1: Разминка",
    gridWidth: 4,
    gridHeight: 4,
    numberCount: 5,
    memorizeTime: 10,
    lives: 3,
  },
  {
    id: 2,
    name: "Уровень 2: Посложнее",
    gridWidth: 5,
    gridHeight: 5,
    numberCount: 6,
    memorizeTime: 15,
    lives: 5,
  },
  {
    id: 3,
    name: "Уровень 3: Классика",
    gridWidth: 5,
    gridHeight: 5,
    numberCount: 7,
    memorizeTime: 20,
    lives: 7,
  },
];
