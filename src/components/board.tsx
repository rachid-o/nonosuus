import React, { useEffect, useState } from "react";
import BoardState, { CellState } from "./board-state";

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
  const [boardState, setBoardState] = useState<BoardState>(new BoardState());
  const handleClick = (row: number, col: number) => {
    // boardState = boardState.handleClick(row, col);
    var newState = boardState.handleClick(row, col);
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
