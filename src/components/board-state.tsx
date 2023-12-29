export enum CellState {
  Empty,
  Filled,
  Marked,
}

export type Position = {
  row: number;
  col: number;
};

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
      if (this.solution.some((p) => p.row === pos.row && p.col === pos.col)) {
        newCells[pos.row][pos.col] = CellState.Filled;
      } else {
        console.warn("Wrong click, no solution at:", pos);
        newCells[pos.row][pos.col] = CellState.Marked;
      }
    }

    this.cells = newCells;
    return new BoardState(newCells, this.solution);
  }

  private getNextState(state: CellState): CellState {
    switch (state) {
      case CellState.Empty:
        return CellState.Filled;
      case CellState.Filled:
        return CellState.Marked;
      case CellState.Marked:
        return CellState.Empty;
    }
  }

  getCells(): Array<Array<CellState>> {
    return this.cells;
  }

  getColumnHeaders(): number[] {
    // count the number of filled solutions in this column
    return Array.from({ length: this.cells.length }, (_, colNr) => {
      return Array.from(this.solution).filter((pos) => pos.col === colNr)
        .length;
    });
  }
  getRowHeaders(): number[] {
    // count the number of filled solutions in this row
    return Array.from({ length: this.cells[0].length }, (_, rowNr) => {
      return Array.from(this.solution).filter((pos) => pos.row === rowNr)
        .length;
    });
  }
}

export default BoardState;
