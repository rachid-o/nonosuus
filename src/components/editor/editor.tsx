import React, { useState } from "react";
import EditorState from "./editor-state";
import { Position } from "../../common/grid";
import { CellState } from "../board-state";

const width = 10;
const height = 10;

const cells = Array.from({ length: height }, () => Array(width).fill(CellState.Empty));

const normalBorder = "1px solid lightgray"; // #6995C2, 316BB6
const helpBorder = "1px solid #cf7776"; // #fa7875, 0844AB

const solution: Array<Position> = [];
for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    solution.push({ row, col });
  }
}

type SquareProps = {
  value: CellState;
  position: { row: number; col: number };

  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, position, onClick }) => (
  <button
    style={{
      width: "40px",
      height: "40px",
      backgroundColor: value === CellState.Filled ? "black" : "white",
      borderRight: position.col > 0 && (position.col + 1) % 5 === 0 ? helpBorder : normalBorder,
      borderLeft: position.col % 5 === 0 ? helpBorder : normalBorder,
      borderBottom: position.row > 0 && (position.row + 1) % 5 === 0 ? helpBorder : normalBorder,
      borderTop: position.row % 5 === 0 ? helpBorder : normalBorder,
    }}
    onClick={onClick}
  >
    {value === CellState.Marked ? "X" : null}
  </button>
);

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>(new EditorState(cells, solution));
  const handleClick = (row: number, col: number) => {
    var newState = editorState.handleClick({ row, col });
    setEditorState(newState);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "40px" }}></div>
      </div>
      {editorState.getCells().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <Square
              position={{ row: rowIndex, col: colIndex }}
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

export default Editor;
