import React, { useState } from "react";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    style={{
      width: "50px",
      height: "50px",
      backgroundColor: value ? "black" : "white",
    }}
    onClick={onClick}
  >
    {value}
  </button>
);

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<Array<string | null>>>(
    Array(5).fill(Array(5).fill(null))
  );

  const handleClick = (row: number, col: number) => {
    console.debug("clicked:", row, col);
    const newSquares = squares.map((r) => r.slice());
    newSquares[row][col] = newSquares[row][col] === "X" ? null : "X";
    setSquares(newSquares);
  };

  const columnHeaders = useState(() =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 5 + 1))
  )[0];

  const rowHeaders = useState(() =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 5 + 1))
  )[0];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50px" }}></div>
        {columnHeaders.map((header, index) => (
          <div key={index} style={{ width: "50px", textAlign: "center" }}>
            {header}
          </div>
        ))}
      </div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          <div style={{ width: "50px", textAlign: "center" }}>
            {rowHeaders[rowIndex]}
          </div>
          {row.map((square, colIndex) => (
            <Square
              key={colIndex}
              value={square}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
