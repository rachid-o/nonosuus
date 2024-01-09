export interface Position {
  row: number;
  col: number;
}

export class Grid<T> {
  cells: T[][];

  constructor(cells: T[][]) {
    this.cells = cells;
  }

  update(p: Position, newValue: T): void {
    this.cells[p.row][p.col] = newValue;
  }

  getValue(p: Position): T {
    return this.cells[p.row][p.col];
  }

  getCells(): T[][] {
    return this.cells;
  }
  getPositions(value: T): Array<Position> {
    let positions = new Array<Position>();

    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === value) {
          positions.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    return positions;
  }

  getHeight(): number {
    return this.cells.length;
  }
  getWidth(): number {
    return this.cells[0].length;
  }
  toString(): string {
    return `${this.getWidth()} x ${this.getHeight()}`;
  }

  static createGrid<T>(width: number, height: number, defaultValue: T): Grid<T> {
    let cells: T[][] = Array.from({ length: height }, () => Array(width).fill(defaultValue));

    return new Grid(cells);
  }

  static createSolution(positions: Array<Position>): Grid<boolean> {
    let width = positions.reduce((max, pos) => Math.max(max, pos.col), 0) + 1;
    let heigth = positions.reduce((max, pos) => Math.max(max, pos.row), 0) + 1;

    let cells: boolean[][] = Array.from({ length: heigth }, () => Array(width).fill(false));
    let grid = new Grid(cells);

    positions.forEach((pos) => grid.update(pos, true));

    return grid;
  }
}
