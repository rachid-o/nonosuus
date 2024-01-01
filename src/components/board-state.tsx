export enum CellState {
  Empty,
  Filled,
  Marked,
}

export interface Position {
  row: number;
  col: number;
}

class BoardState {
  cells: Array<Array<CellState>>;
  solution: Array<Position>;

  constructor(cells: Array<Array<CellState>>, solution: Array<Position>) {
    this.solution = solution;
    this.cells = cells;
  }

  handleClick(pos: Position) {
    // console.info("BoardState handle click:", pos);
    const newCells = this.cells.map((r) => r.slice());

    if (newCells[pos.row][pos.col] === CellState.Empty) {
      if (this.solutionContains(pos)) {
        newCells[pos.row][pos.col] = CellState.Filled;
      } else {
        console.warn("Wrong click, no solution at:", pos);
        newCells[pos.row][pos.col] = CellState.Marked;
      }
    }

    this.cells = newCells;
    return new BoardState(newCells, this.solution);
  }

  private solutionContains(pos: Position) {
    return this.solution.some((p) => p.row === pos.row && p.col === pos.col);
  }

  getCells(): Array<Array<CellState>> {
    return this.cells;
  }

  getColumnHeaders(): number[][] {
    // TODO: Calc the filled connected cells and return an array for each column

    // count the number of filled solutions in this column
    let headers = [];
    for (let col = 0; col < this.cells[0].length; col++) {
      let count = 0;
      let columnCounts = [];
      for (let row = 0; row < this.cells.length; row++) {
        if (this.solutionContains({ row, col })) {
          count++;
        } else if (count > 0) {
          columnCounts.push(count);
          count = 0;
        }
      }
      if (count > 0) {
        columnCounts.push(count);
      }
      if (columnCounts.length === 0) {
        columnCounts.push(0);
      }
      headers.push(columnCounts);
    }
    return headers;
  }

  getRowHeaders(): number[][] {
    let headers = [];
    for (let row = 0; row < this.cells.length; row++) {
      let count = 0;
      let rowCounts = [];
      for (let col = 0; col < this.cells[0].length; col++) {
        if (this.solutionContains({ row, col })) {
          count++;
        } else if (count > 0) {
          rowCounts.push(count);
          count = 0;
        }
      }
      if (count > 0) {
        rowCounts.push(count);
      }
      if (rowCounts.length === 0) {
        rowCounts.push(0);
      }
      headers.push(rowCounts);
    }
    return headers;
  }
}

export default BoardState;
