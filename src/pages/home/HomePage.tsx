import { Link } from "react-router-dom";
import Board from "../../components/board/board";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <h1>No, no...</h1>
      <div style={{ paddingLeft: "30px", paddingTop: "30px" }}>
        <Board />
      </div>
      <br />
      <br />
      <Link to="/editor">Create your own</Link>
    </div>
  );
};

export default HomePage;
