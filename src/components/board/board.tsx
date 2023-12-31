import React, { useState } from "react";
import BoardState, { CellState } from "../board-state";
import { heart, love } from "../puzzles/solutions";
import { Grid } from "../../common/grid";
import Switch from "react-switch";

const solutionPositions = love;
// const solutionPositions = heart;

let solution = Grid.createSolution(solutionPositions);

let boardGrid = Grid.createGrid(solution.getWidth(), solution.getHeight(), CellState.Empty);

const filledColor = "#444444";
const markedColor = "lightgray";
const markedColorWrong = "red";

const normalBorder = "1px solid lightgray"; // #6995C2, 316BB6
const helpBorder = "1px solid #cf7776"; // #fa7875, 0844AB

type SquareProps = {
  state: CellState;
  position: { row: number; col: number };
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ state, position, onClick }) => {
  let backgroundColor = "white";
  let color = backgroundColor;

  switch (state) {
    case CellState.Filled:
      backgroundColor = filledColor;
      color = filledColor;
      break;
    case CellState.MarkedWrong:
      color = markedColorWrong;
      break;
    case CellState.Marked:
      color = markedColor;
      break;
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
        borderRight: position.col > 0 && (position.col + 1) % 5 === 0 ? helpBorder : normalBorder,
        borderLeft: position.col % 5 === 0 ? helpBorder : normalBorder,
        borderBottom: position.row > 0 && (position.row + 1) % 5 === 0 ? helpBorder : normalBorder,
        borderTop: position.row % 5 === 0 ? helpBorder : normalBorder,
      }}
      onClick={onClick}
    >
      ✖
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
        marginBottom: "3vh",
      }}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${solution.getWidth() + 1}, 1fr)`,
              gridTemplateRows: `repeat(${solution.getHeight() + 1}, 1fr)`,
              gridAutoRows: "1fr",
              // TODO: in landscape mode, the heigth (vh) should be used instead of width
              width: "75vw",
              height: "75vw",
              maxWidth: "75vw",
              maxHeight: "75vw",
              marginBottom: "14vw",
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
                    position={{ row: rowIndex, col: colIndex }}
                    onClick={() => handleClick(rowIndex, colIndex)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "4vh",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                marginRight: "2vw",
                color: markedColor,
                fontSize: "6vw",
                fontWeight: "bold",
              }}
              onClick={() => setFillOrMark(CellState.Marked)}
            >
              ✖
            </div>
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
          <div
            style={{ marginLeft: "2vw", color: filledColor, fontSize: "6vw" }}
            onClick={() => setFillOrMark(CellState.Filled)}
          >
            ■
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
