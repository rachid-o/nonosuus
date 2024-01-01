import { Position } from "../../common/grid";
import { CellState } from "../board-state";

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

    this.cells = newCells;
    this.printState();
    return new EditorState(newCells, this.solution);
  }

  private printState() {
    // convert all cells that are CellState.Filled to an Array<Position>
    let filledPositions: Array<Position> = [];
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === CellState.Filled) {
          filledPositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    // console.log("filledPositions: ", filledPositions);
    console.log("filledPositions JSON: ", JSON.stringify(filledPositions));
  }

  getCells(): Array<Array<CellState>> {
    return this.cells;
  }

  getColumnHeaders(): number[] {
    return Array.from({ length: this.cells[0].length }, (_, colNr) => {
      return Array.from(this.solution).filter((pos) => pos.col === colNr).length;
    });
  }
  getRowHeaders(): number[] {
    return Array.from({ length: this.cells.length }, (_, rowNr) => {
      return Array.from(this.solution).filter((pos) => pos.row === rowNr).length;
    });
  }
}

export default EditorState;
