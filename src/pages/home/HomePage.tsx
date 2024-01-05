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
        paddingTop: "2vw",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1 }}>
        <Board />
        <br />
        <br />
        <Link
          to="/editor"
          style={{
            textDecoration: "none",
            color: "blue",
            fontSize: "2vh",
          }}
        >
          Create your own
        </Link>
      </div>
      <div>
        <footer
          style={{
            fontSize: "2vh",
            bottom: 0,
            width: "100%",
            textAlign: "center",
            padding: "1vh",
          }}
        >
          Build: {process.env.REACT_APP_VERSION}
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
