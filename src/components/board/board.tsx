import React, { useEffect, useState } from "react";
import BoardState, { CellState } from "../board-state";
import { divide, duck, heart, love, minus, plus } from "../puzzles/solutions";
import { Grid, Position } from "../../common/grid";
import Switch from "react-switch";
import { Link, useParams } from "react-router-dom";

export interface Puzzle {
  solution: Array<Position>;
}
const puzzleList = [minus, plus, divide, heart, love];
// const puzzleList = [minus, love, plus];

const puzzles: { [key: string]: Puzzle } = Object.fromEntries(
  puzzleList.map((puzzle, index) => [(index + 1).toString(), { solution: puzzle }])
);

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

function getBoardState(puzzleId: string): BoardState {
  if (!puzzles[puzzleId]) {
    console.info("Puzzle not found: ", puzzleId);
    return new BoardState(Grid.createGrid(1, 1, CellState.Empty), Grid.createGrid(1, 1, false));
  }
  let puzzle = puzzles[puzzleId].solution;
  let solution = Grid.createSolution(puzzle);
  let boardGrid = Grid.createGrid(solution.getWidth(), solution.getHeight(), CellState.Empty);

  return new BoardState(boardGrid, solution);
}

const Board: React.FC = () => {
  const { puzzleId } = useParams();
  if (puzzleId === undefined || puzzleId.trim() === "") {
    throw new Error("puzzleId is undefined");
  }
  const nextPuzzleLink = "/puzzle/" + (parseInt(puzzleId) + 1);

  useEffect(() => {
    setIsLevelFinished(false);
    setBoardState(getBoardState(puzzleId));
  }, [puzzleId]);

  // const [boardState, setBoardState] = useState<BoardState>(new BoardState(boardGrid, solution));
  let initialBoardState = getBoardState(puzzleId);

  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [fillOrMark, setFillOrMark] = useState<CellState>(CellState.Filled);
  const toggleFillOrMark = () => {
    setFillOrMark(fillOrMark === CellState.Marked ? CellState.Filled : CellState.Marked);
  };
  const [isLevelFinished, setIsLevelFinished] = useState<boolean>(false);

  const handleClick = (row: number, col: number) => {
    var newState = boardState.handleClick({ row, col }, fillOrMark);
    setBoardState(newState);
    if (newState.isFinished()) {
      setIsLevelFinished(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
        marginBottom: "3vh",
      }}
    >
      <h1 style={{ fontSize: "6vh" }}>Puzzle {puzzleId}</h1>

      <div
        style={{
          visibility: isLevelFinished ? "visible" : "hidden",
          marginBottom: "5vw",
          fontSize: "4vw",
        }}
      >
        Puzzle Finished! <br />
        <Link
          to={nextPuzzleLink}
          style={{
            textDecoration: "none",
            color: "blue",
          }}
        >
          Click here to open the next one
        </Link>
      </div>

      <div
        style={{
          position: "relative",
          // border: "1px dashed blue",
          // width: "75vw",
          // height: "75vw",
          // maxWidth: "75vw",
          // maxHeight: "75vw",
          marginBottom: "10vw",
          // overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // border: "2px dashed orange"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${boardState.grid.getWidth() + 1}, 1fr)`,
              gridTemplateRows: `repeat(${boardState.grid.getHeight() + 1}, 1fr)`,
              gridAutoRows: "1fr",
              // TODO: in landscape mode, the heigth (vh) should be used instead of width
              // width: "100%",
              // height: "100%",
              // width: "60vw",
              // height: "60vw",
              width: "75vw",
              height: "75vw",
              maxWidth: "75vw",
              maxHeight: "75vw",
              // overflow: "auto",
              // height: "75vw",
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
            marginTop: "12vh",
          }}
        >
          <br />
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
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0vw 1vw 1vw rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0vw 0vw 1vw 1vw rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
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
