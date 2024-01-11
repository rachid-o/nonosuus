import { Link } from "react-router-dom";
import Board from "../../components/board/board";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "98vh",
        maxHeight: "98vh",
        margin: "1vw",
        paddingTop: "10vw",
        overflow: "hidden",
      }}
    >
      <h1 style={{ fontSize: "6vh" }}>Welcome</h1>
      <br /> <br />
      <div style={{ flex: 1 }}>
        <Link
          to="/puzzle/1"
          style={{
            textDecoration: "none",
            color: "blue",
            fontSize: "4vh",
          }}
        >
          Start playing puzzles
        </Link>
        <br /> <br /> <br /> <br />
        <br /> <br /> <br /> <br />
        <Link
          to="/editor"
          style={{
            textDecoration: "none",
            color: "blue",
            fontSize: "2vh",
          }}
        >
          Create your own puzzle
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
