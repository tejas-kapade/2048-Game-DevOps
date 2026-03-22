// app.js

const express = require("express");
const cors = require("cors");
const { initializeGame, makeMove } = require("./gameLogic");

const app = express();
app.use(cors());
app.use(express.json());

let gameState = initializeGame();

const path = require("path");

// serve frontend folder
app.use(express.static(path.join(__dirname, "frontend")));


app.get("/start", (req, res) => {
  gameState = initializeGame();
  res.json(gameState);
});

app.post("/move", (req, res) => {
  const { direction } = req.body;

  const result = makeMove(gameState.grid, direction);

  gameState.grid = result.grid;
  gameState.score += result.score;

  res.json({
    grid: gameState.grid,
    score: gameState.score,
    gameOver: result.gameOver
  });
});


console.log("Frontend path:", path.join(__dirname, "frontend"));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});