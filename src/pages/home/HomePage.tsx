import { Link } from "react-router-dom";
import Board from "../../components/board/board";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <h1>No, no...</h1>
      <Board />
      <br />
      <Link to="/editor">Create your own</Link>
      <br />
      <br />
      <footer
        style={{
          fontSize: "12px",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          padding: "20px",
        }}
      >
        Build: {process.env.REACT_APP_VERSION}
      </footer>
    </div>
  );
};

export default HomePage;
