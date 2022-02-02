import logo from "./logo.svg";
import "./App.css";
import {
  Routes,
  Route,
  Link,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import Sudoku from "./Sudoku/Sudoku";
function App() {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px",
    margin: "25px",
  };
  return [
    <Router>
      <div style={divStyle}>
        <Link to="/sudoku" exact="true">
          Sudoku
        </Link>
      </div>
      <Routes
        path="/"
        element={
          <div className="outlet" style={divStyle}>
            <Outlet />
          </div>
        }
      >
        <Route path="/sudoku" element={<Sudoku />}></Route>
      </Routes>
    </Router>,
  ];
}

export default App;
