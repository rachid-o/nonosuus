import React, { useState } from "react";

type SquareProps = {
  value: string | null;
  onClick: () => void;
};

// const Square: React.FC<SquareProps> = ({ value, onClick }) => (
//   <button style={{ width: "50px", height: "50px" }} onClick={onClick}>
//     {value}
//   </button>
// );

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
  const [squares, setSquares] = useState<Array<string | null>>(
    Array(25).fill(null)
  );

  const handleClick = (index: number) => {
    console.log("clicked:", index);
    const newSquares = squares.slice();
    newSquares[index] = squares[index] === "X" ? null : "X";
    setSquares(newSquares);
  };

  const columnHeaders = useState(() =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 5 + 1))
  )[0];

  const rowHeaders = useState(() =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 5 + 1))
  )[0];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "300px" }}>
      <div style={{ width: "50px" }}></div>

      {columnHeaders.map((header, index) => (
        <div key={index} style={{ width: "50px", textAlign: "center" }}>
          {header}
        </div>
      ))}
      {/* {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => handleClick(index)} />
      ))} */}

      {squares.map((square, index) => {
        if (index % 5 === 0) {
          return (
            <>
              <div style={{ width: "50px", textAlign: "center" }}>
                {rowHeaders[index / 5]}
              </div>
              <Square
                key={index}
                value={square}
                onClick={() => handleClick(index)}
              />
            </>
          );
        }
        return (
          <Square
            key={index}
            value={square}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default Board;
