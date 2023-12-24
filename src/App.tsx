import "./App.css";
import Board from "./components/board";
// import Counter from "./components/counter";

function App() {
  return (
    <div className="App">
      <div style={{ paddingLeft: "30px", paddingTop: "30px" }}>
        <Board />
      </div>
    </div>
  );
}

export default App;
