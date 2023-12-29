import { Position } from "./board-state";

export const plus: Array<Position> = [
  { row: 1, col: 1 },
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 2, col: 1 },
  { row: 1, col: 2 },
];

export const minus: Array<Position> = [
  { row: 1, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 2 },
];

export const l: Array<Position> = [
  { row: 0, col: 1 },
  { row: 1, col: 1 },
  { row: 2, col: 1 },
];
