import { createHashRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import EditorPage from "../pages/editor/EditorPage";
import PuzzlePage from "../pages/puzzle/PuzzlePage";

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
        path: "editor",
        element: <EditorPage />,
      },
    ],
  },
]);
