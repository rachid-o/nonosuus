import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import EditorPage from "../pages/editor/EditorPage";
import PuzzlePage from "../pages/puzzle/PuzzlePage";
import EndPage from "../pages/end/EndPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "puzzle/:puzzleId",
        element: <PuzzlePage />,
      },
      {
        path: "end",
        element: <EndPage />,
      },
      {
        path: "editor",
        element: <EditorPage />,
      },
    ],
  },
]);
