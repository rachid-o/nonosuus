import React, { useState } from "react";
import BoardState, { CellState, Position } from "../board-state";
import { divide, duck, l, minus, plus } from "../solutions";

// const width = 3;
// const height = 3;
const width = 9;
const height = 9;

const solution = duck;
// const solution = divide;
// const solution = l;
// const solution = plus;

const cells = Array.from({ length: height }, () =>
  Array(width).fill(CellState.Empty)
);

type SquareProps = {
  value: CellState;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    style={{
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
      width: "60px",
      height: "60px",
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
        <div style={{ width: "60px" }}></div>
        {boardState.getColumnHeaders().map((headers, index) => (
          <div key={index} style={{ width: "60px", textAlign: "center" }}>
            {headers.map((header, index) => (
              <div key={index}>{header}</div>
            ))}
          </div>
        ))}
      </div>
      {boardState.getCells().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              width: "60px",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {boardState.getRowHeaders()[rowIndex].join("  ")}
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
