const convertMapToGrid = (map) => {
  const grid = [];
  let count = 0;
  let tempCount = 0;
  for (let [key, value] of map) {
    if (!grid[count % 9]) {
      grid[count % 9] = [];
    }
    grid[count % 9].push(value);
    tempCount++;
    if (tempCount === 9) {
      tempCount = 0;
      count++;
    }
  }
  return grid;
};

const solve = (grid, row, column) => {
  // Check if reached at the end of sudoku matrix
  if (row == grid.length - 1 && column == grid[row].length) {
    return true;
  }

  // Check if reached at the end of sudoku row
  if (column == grid[row].length) {
    row += 1;
    column = 0;
  }

  // Check if empty cell
  if (grid[row][column] != "" && grid[row][column] != ".") {
    return solve(grid, row, column + 1);
  }

  for (let number = 1; number < 10; number++) {
    if (isSafe(grid, row, column, number)) {
      grid[row][column] = number;

      if (solve(grid, row, column + 1)) {
        return true;
      }
    }
    grid[row][column] = "";
  }

  return false;
};

export default function solveSudoku(map) {
  const grid = convertMapToGrid(map);
  if (solve(grid, 0, 0)) {
    console.log(grid);
    return grid;
  } else {
    return -1;
  }
}

function isSafe(grid, row, column, number) {
  //Check row
  for (let i = 0; i < grid[row].length; i++) {
    if (grid[row][i] == number) {
      return false;
    }
  }
  // Check column
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][column] == number) {
      return false;
    }
  }
  //Check 3*3 box

  let startRow = row - (row % 3);
  let startColumn = column - (column % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startColumn] == number) {
        return false;
      }
    }
  }

  return true;
}
