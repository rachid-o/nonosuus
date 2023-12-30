import { Link } from "react-router-dom";
import Editor from "../../components/editor/editor";

interface Props {}

const EditorPage: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <h1>Editor</h1>
      <Editor />
      <br />
      <br />
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default EditorPage;
