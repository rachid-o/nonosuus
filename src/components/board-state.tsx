import { isEqual } from "lodash";
import { Grid, Position } from "../common/grid";
// import { isEqual } from "lodash";

export enum CellState {
  Empty,
  Filled,
  Marked,
  MarkedWrong,
}

class BoardState {
  grid: Grid<CellState>;
  solution: Grid<boolean>;

  constructor(cells: Grid<CellState>, solution: Grid<boolean>) {
    this.solution = solution;
    this.grid = cells;
  }

  handleClick(pos: Position, expectedState: CellState) {
    // console.debug( "BoardState expect state of cell: " + pos + "to be: " + expectedState);
    const currentState = this.grid.getValue(pos);
    if (currentState === CellState.Filled) {
      console.debug("Already filled, do nothing");
      return new BoardState(this.grid, this.solution);
    }

    switch (expectedState) {
      case CellState.Marked:
        if (currentState === CellState.Empty) {
          this.grid.update(pos, CellState.Marked);
        } else if (currentState === CellState.Marked) {
          this.grid.update(pos, CellState.Empty);
        }
        break;
      case CellState.Filled:
        if (this.solution.getValue(pos)) {
          this.grid.update(pos, CellState.Filled);
        } else {
          this.grid.update(pos, CellState.MarkedWrong);
        }
        break;
      default:
      // Do Nothing
    }
    return new BoardState(this.grid, this.solution);
  }

  isFinished(): boolean {
    return isEqual(this.grid.getPositions(CellState.Filled), this.solution.getPositions(true));
  }

  getCells(): Array<Array<CellState>> {
    return this.grid.getCells();
  }

  getColumnHeaders(): number[][] {
    let headers = [];
    for (let col = 0; col < this.grid.getWidth(); col++) {
      let count = 0;
      let columnCounts = [];
      for (let row = 0; row < this.grid.getHeight(); row++) {
        if (this.solution.getValue({ row, col })) {
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
    for (let row = 0; row < this.grid.getHeight(); row++) {
      let count = 0;
      let rowCounts = [];
      for (let col = 0; col < this.grid.getWidth(); col++) {
        if (this.solution.getValue({ row, col })) {
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
