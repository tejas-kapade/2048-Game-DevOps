// gameLogic.js

const SIZE = 4;

function createEmptyGrid() {
  return Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));
}

function addRandomTile(grid) {
  const empty = [];

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) empty.push({ i, j });
    }
  }

  if (empty.length === 0) return grid;

  const { i, j } = empty[Math.floor(Math.random() * empty.length)];
  grid[i][j] = Math.random() < 0.9 ? 2 : 4;

  return grid;
}

function initializeGame() {
  let grid = createEmptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return { grid, score: 0 };
}

// Helper: compress row (remove zeros)
function compress(row) {
  return row.filter(num => num !== 0);
}

// Helper: merge row
function merge(row) {
  let score = 0;

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }

  return { row, score };
}

function moveLeft(grid) {
  let newGrid = [];
  let totalScore = 0;

  for (let row of grid) {
    let newRow = compress(row);
    let { row: mergedRow, score } = merge(newRow);
    newRow = compress(mergedRow);

    while (newRow.length < SIZE) newRow.push(0);

    newGrid.push(newRow);
    totalScore += score;
  }

  return { grid: newGrid, score: totalScore };
}

function reverse(grid) {
  return grid.map(row => row.reverse());
}

function transpose(grid) {
  return grid[0].map((_, i) => grid.map(row => row[i]));
}

function moveRight(grid) {
  let reversed = reverse(grid);
  let { grid: moved, score } = moveLeft(reversed);
  return { grid: reverse(moved), score };
}

function moveUp(grid) {
  let transposed = transpose(grid);
  let { grid: moved, score } = moveLeft(transposed);
  return { grid: transpose(moved), score };
}

function moveDown(grid) {
  let transposed = transpose(grid);
  let { grid: moved, score } = moveRight(transposed);
  return { grid: transpose(moved), score };
}

function isGameOver(grid) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) return false;

      if (j < SIZE - 1 && grid[i][j] === grid[i][j + 1]) return false;
      if (i < SIZE - 1 && grid[i][j] === grid[i + 1][j]) return false;
    }
  }
  return true;
}

function makeMove(grid, direction) {
  let result;

  switch (direction) {
    case "left":
      result = moveLeft(grid);
      break;
    case "right":
      result = moveRight(grid);
      break;
    case "up":
      result = moveUp(grid);
      break;
    case "down":
      result = moveDown(grid);
      break;
    default:
      return { grid, score: 0 };
  }

  let newGrid = addRandomTile(result.grid);

  return {
    grid: newGrid,
    score: result.score,
    gameOver: isGameOver(newGrid)
  };
}

module.exports = {
  initializeGame,
  makeMove
};