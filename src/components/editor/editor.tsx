import React, { useState } from "react";
import EditorState from "./editor-state";
import { Position } from "../../common/grid";
import { CellState } from "../board-state";

const width = 10;
const height = 10;

const cells = Array.from({ length: height }, () => Array(width).fill(CellState.Empty));

const solution: Array<Position> = [];
for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    solution.push({ row, col });
  }
}

type SquareProps = {
  value: CellState;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    style={{
      width: "40px",
      height: "40px",
      backgroundColor: value === CellState.Filled ? "black" : "white",
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
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "40px" }}></div>
        {editorState.getColumnHeaders().map((header, index) => (
          <div key={index} style={{ width: "40px", textAlign: "center" }}>
            {header}
          </div>
        ))}
      </div>
      {editorState.getCells().map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          <div style={{ width: "40px", textAlign: "center" }}>
            {editorState.getRowHeaders()[rowIndex]}
          </div>
          {row.map((cell, colIndex) => (
            <Square key={colIndex} value={cell} onClick={() => handleClick(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Editor;
