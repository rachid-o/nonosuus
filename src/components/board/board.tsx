import React, { useState } from "react";
import BoardState, { CellState } from "../board-state";
import { duck } from "../solutions";
import { Grid } from "../../common/grid";
import Switch from "react-switch";

const solutionPositions = duck;
// const solutionPositions = dot_2_high;
// const solutionPositions = l;

let solution = Grid.createSolution(solutionPositions);

let boardGrid = Grid.createGrid(solution.getWidth(), solution.getHeight(), CellState.Empty);

type SquareProps = {
  state: CellState;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ state, onClick }) => {
  let backgroundColor = "white";
  let buttonValue = null;
  let color = "lightgray";

  switch (state) {
    case CellState.Filled:
      backgroundColor = "black";
      break;
    case CellState.MarkedWrong:
      color = "red";
      buttonValue = "✖";
      break;
    case CellState.Marked:
      color = "lightgray";
      buttonValue = "✖";
      break;
    default:
      backgroundColor = "white";
  }
  return (
    <button
      style={{
        height: "100%",
        fontSize: "5vw",
        color: color,
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      {buttonValue}
    </button>
  );
};

const Board: React.FC = () => {
  const [boardState, setBoardState] = useState<BoardState>(new BoardState(boardGrid, solution));
  const [fillOrMark, setFillOrMark] = useState<CellState>(CellState.Filled);
  const toggleFillOrMark = () => {
    setFillOrMark(fillOrMark === CellState.Marked ? CellState.Filled : CellState.Marked);
  };

  const handleClick = (row: number, col: number) => {
    var newState = boardState.handleClick({ row, col }, fillOrMark);
    setBoardState(newState);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${solution.getWidth() + 1}, 1fr)`,
            gridTemplateRows: `repeat(${solution.getHeight() + 1}, 1fr)`,
            gridAutoRows: "1fr",
            // TODO: in landscape mode, the heigth (vh) should be used instead of width
            width: "80vw",
            height: "80vw",
            maxWidth: "80vw",
            maxHeight: "80vw",
            marginBottom: "5vw",
          }}
        >
          <div key="-1" style={{ textAlign: "center" }}></div>
          {boardState.getColumnHeaders().map((headers, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                fontSize: "4vw",
                paddingBottom: "1vw",
                textAlign: "center",
              }}
            >
              {headers.map((header, index) => (
                <div key={index} style={{ textAlign: "center", marginBottom: "2vw" }}>
                  {header}
                </div>
              ))}
            </div>
          ))}
          {boardState.getRowHeaders().map((headers, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  fontSize: "4vw",
                  paddingRight: "1vw",
                }}
              >
                {headers.map((header, index) => (
                  <div key={index} style={{ marginRight: "2vw" }}>
                    {header}
                  </div>
                ))}
              </div>
              {boardState.getCells()[rowIndex].map((cell, colIndex) => (
                <Square
                  key={colIndex}
                  state={cell}
                  onClick={() => handleClick(rowIndex, colIndex)}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                marginRight: "2vw",
                color: "lightgray",
                fontSize: "6vw",
                fontWeight: "bold",
              }}
            >
              {/* X */}✖
            </div>

            <Switch
              checked={fillOrMark === CellState.Filled}
              onChange={toggleFillOrMark}
              offColor="#D3D3D3"
              onColor="#D3D3D3"
              offHandleColor="#e0e0e0"
              onHandleColor="#000000"
              handleDiameter={60}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0vw 1vw 2vw rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0vw 0vw 1vw 3vw rgba(0, 0, 0, 0.2)"
              height={40}
              width={96}
            />

            <div style={{ marginLeft: "2vw", color: "black", fontSize: "6vw" }}>■</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
