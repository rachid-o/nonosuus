import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { Outlet, useLocation } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "absolute",
        top: "4vw",
        left: "4vw",
        fontSize: "4vw",
      }}
    >
      &larr; Go Back
    </button>
  );
};

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* <div className="App" style={{ display: "flex", flexDirection: "column" }}> */}
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "98vh",
          minHeight: "98vh",
          maxHeight: "98vh",
          height: "95vh",
          margin: "1vw",
          paddingTop: "2vw",
          paddingBottom: "2vw",
          // overflow: "hidden",
        }}
      >
        <div>{location.pathname !== "/" && <BackButton />}</div>
        <div>
          <Outlet />
        </div>

        <div>
          <footer
            style={{
              fontSize: "2vh",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              padding: "2vh",
            }}
          >
            Build: {process.env.REACT_APP_VERSION}
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
