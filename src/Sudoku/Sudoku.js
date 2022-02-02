import React, { useContext, useReducer } from "react";
import solveSudoku from "./SodokuAlgo";

const StateContext = React.createContext({ state: null, dispatch: null });

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      const map = new Map(state.map);
      map.set(action.key, action.value);
      return { map };
    }
    case "SET_MAP": {
      return { map: action.map };
    }
    case "RESET_GRID": {
      const map = new Map();
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          map.set(`${i}${j}`, "");
        }
      }
      return { map };
    }
    default: {
      return { map: new Map() };
    }
  }
};

Number.prototype.range = function () {
  const _arr = [];
  for (let i = 0; i < this; i++) {
    _arr.push(i);
  }
  return _arr;
};

const colorMap = new Map();
colorMap.set("00", "#A1F2F5");
colorMap.set("03", "#C7D5FC");
colorMap.set("06", "#EFFC8A");
colorMap.set("30", "#ABFFB1");
colorMap.set("33", "#C9FFDF");
colorMap.set("36", "#4CDAFB");
colorMap.set("60", "#FFC660");
colorMap.set("63", "#FFB3A6");
colorMap.set("66", "#FF90BC");

export function Column({ row, column, disableUser }) {
  const { state, dispatch } = useContext(StateContext);
  const columnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
  };
  const box = `${row - (row % 3)}${column - (column % 3)}`;

  const inputStyle = {
    width: "100%",
    height: "100%",
    border: "1px solid black",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: colorMap.get(box),
  };

  const change = ([key, value]) => {
    dispatch({ type: "SET_VALUE", key, value });
  };

  return (
    <div className={`r_${row}c_${column}_b${box}`} style={columnStyle}>
      <input
        style={inputStyle}
        value={state?.map?.get(`${row}${column}`)}
        onChange={(e) => change([`${row}${column}`, e.target.value])}
        disabled={disableUser}
      />
    </div>
  );
}

export function Row({ row, children }) {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  return (
    <div className={`row_${row}`} style={rowStyle}>
      {children}
    </div>
  );
}

export function Matrix({ row, column, change, disableUser }) {
  const rows = [];

  for (let i = 0; i < row; i++) {
    rows.push(
      <Row row={i} key={`${i}`}>
        {column.range().map((n, index) => {
          return (
            <Column
              key={`${i}${index}`}
              row={i}
              column={index}
              disableUser={disableUser}
            />
          );
        })}
      </Row>
    );
  }
  return rows;
}

export default function Sudoku() {
  const [config, setConfig] = React.useState({
    row: 9,
    column: 9,
  });

  const [disableUser, stopUser] = React.useState(false);

  const solve = () => {
    const grid = solveSudoku(new Map(state.map));
    stopUser(true);
    if (grid) {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          dispatch({ type: "SET_VALUE", key: `${i}${j}`, value: grid[i][j] });
        }
      }
    } else {
      alert("Sudoku cannot be solved , please check all inputs");
    }
  };

  const edit = () => {
    stopUser(false);
  };

  const actionStyle = {
    display: "flex",
    justifyContent: "space-around",
    margin: "25px 0",
    padding: "25px",
    background: "aliceblue",
  };

  const buttonStyle = {
    background: "black",
    color: "white",
    fontWeight: "bolder",
    margin: "15px",
    fontFamily: "Consolas",
    cursor: "pointer",
  };

  const grid = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  const m = new Map();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      m.set(`${i}${j}`, grid[i][j]);
    }
  }

  const [sample, showSample] = React.useState(false);

  const [state, dispatch] = useReducer(reducer, { map: new Map() });

  React.useEffect(() => {
    if (sample) {
      dispatch({ type: "SET_MAP", map: m });
    } else {
      dispatch({ type: "RESET_GRID" });
    }
  }, [sample]);

  const divStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "25px",
    margin: "25px",
  };

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div style={divStyle}>
        <input
          type="checkbox"
          checked={sample}
          onChange={(e) => showSample(e.target.checked)}
        />
        Sample
        <Matrix
          row={config.row}
          column={config.column}
          disableUser={disableUser}
        />
        <div style={actionStyle}>
          <button onClick={solve} style={buttonStyle}>
            Solve
          </button>
          <button onClick={edit} style={buttonStyle}>
            Edit
          </button>
        </div>
      </div>
    </StateContext.Provider>
  );
}
