export enum CellState {
  Empty,
  Filled,
  Marked,
}

export type Position = {
  row: number;
  col: number;
};

class EditorState {
  cells: Array<Array<CellState>>;
  solution: Array<Position>;

  constructor(cells: Array<Array<CellState>>, solution: Array<Position>) {
    this.solution = solution;
    this.cells = cells;
  }

  handleClick(pos: Position) {
    const newCells = this.cells.map((r) => r.slice());

    if (newCells[pos.row][pos.col] === CellState.Filled) {
      newCells[pos.row][pos.col] = CellState.Marked;
    } else {
      newCells[pos.row][pos.col] = CellState.Filled;
    }

    // print all cells that are CellState.Filled

    this.cells = newCells;
    this.printState();
    return new EditorState(newCells, this.solution);
  }

  private printState() {
    // const state = this.cells
    //   .map((row, rowIndex) => {
    //     return row
    //       .map((cell, colIndex) => {
    //         if (cell === CellState.Filled) {
    //           return { row: rowIndex, col: colIndex };
    //         }
    //       })
    //       .filter((cell) => cell !== undefined);
    //   })
    //   .filter((row) => row.length > 0);

    // convert all cells that are CellState.Filled to an Array<Position>
    let filledPositions: Array<Position> = [];
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === CellState.Filled) {
          filledPositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    console.log("filledPositions: ", filledPositions);
    console.log("filledPositions JSON: ", JSON.stringify(filledPositions));
    // console.log(
    //   "Current state:",
    //   state
    // .map((row) => JSON.stringify(row))
    // );
  }

  getCells(): Array<Array<CellState>> {
    return this.cells;
  }

  getColumnHeaders(): number[] {
    return Array.from({ length: this.cells[0].length }, (_, colNr) => {
      return Array.from(this.solution).filter((pos) => pos.col === colNr)
        .length;
    });
  }
  getRowHeaders(): number[] {
    return Array.from({ length: this.cells.length }, (_, rowNr) => {
      return Array.from(this.solution).filter((pos) => pos.row === rowNr)
        .length;
    });
  }
}

export default EditorState;
