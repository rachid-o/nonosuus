export enum CellState {
  Empty,
  Filled,
  Marked,
}

const width = 3;
const height = 2;

class BoardState {
  cells: Array<Array<CellState>>;

  constructor(cells?: Array<Array<CellState>>) {
    // console.debug("BoardState constructor, cells:", cells);
    if (cells) {
      this.cells = cells;
    } else {
      this.cells = Array.from({ length: height }, () =>
        Array(width).fill(CellState.Empty)
      );
    }
  }

  handleClick(row: number, col: number) {
    console.info("BoardState handle click:", row, col);
    const newCells = this.cells.map((r) => r.slice());

    newCells[row][col] = this.getNextState(newCells[row][col]);

    this.cells = newCells;
    return new BoardState(newCells);
  }

  getCells(): Array<Array<CellState>> {
    return this.cells;
  }

  getColumnHeaders(): number[] {
    return Array.from({ length: width }, () =>
      Math.floor(Math.random() * 5 + 1)
    );
  }
  getRowHeaders(): number[] {
    return Array.from({ length: height }, () =>
      Math.floor(Math.random() * 5 + 1)
    );
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
}

export default BoardState;
