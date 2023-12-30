import "./App.css";
import { Outlet } from "react-router-dom";

// class App extends React.Component {
function App() {
  return (
    <>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export default App;
