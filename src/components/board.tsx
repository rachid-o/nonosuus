import React, { useState } from "react";
import BoardState, { CellState, Position } from "./board-state";
import { l, minus, plus } from "./solutions";

const width = 3;
const height = 3;

const cells = Array.from({ length: height }, () =>
  Array(width).fill(CellState.Empty)
);

const solution = minus;
// const solution = l;
// const solution = plus;

type SquareProps = {
  value: CellState;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    style={{
      width: "50px",
      height: "50px",
      backgroundColor: value === CellState.Filled ? "black" : "white",
    }}
    onClick={onClick}
  >
    {value === CellState.Marked ? "X" : null}
  </button>
);

const Board: React.FC = () => {
  const [boardState, setBoardState] = useState<BoardState>(
    new BoardState(cells, solution)
  );
  const handleClick = (row: number, col: number) => {
    var newState = boardState.handleClick({ row, col });
    setBoardState(newState);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50px" }}></div>
        {boardState.getColumnHeaders().map((header, index) => (
          <div key={index} style={{ width: "50px", textAlign: "center" }}>
            {header}
          </div>
        ))}
      </div>
      {boardState.getCells().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          <div style={{ width: "50px", textAlign: "center" }}>
            {boardState.getRowHeaders()[rowIndex]}
          </div>
          {row.map((cell, colIndex) => (
            <Square
              key={colIndex}
              value={cell}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
