const API = "";
let highScore = localStorage.getItem("highScore") || 0;

async function startGame() {
  const res = await fetch(`${API}/start`);
  const data = await res.json();
  render(data.grid, data.score);
}

async function move(direction) {
  const res = await fetch(`${API}/move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ direction })
  });

  const data = await res.json();
  render(data.grid, data.score);

  if (data.gameOver) {
    showGameOver(data.score);
  }
}

/* OLD RENDER VERSION
function render(grid, score) {
  const gridDiv = document.getElementById("grid");
  gridDiv.innerHTML = "";

  grid.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement("div");
      div.className = "cell";

      if (cell !== 0) {
        div.innerText = cell;
        div.classList.add(`tile-${cell}`);
      }

      gridDiv.appendChild(div);
    });
  });

  document.getElementById("score").innerText = `Score: ${score}`;
}
  */

function render(grid, score) {
  const gridDiv = document.getElementById("grid");
  gridDiv.innerHTML = "";

  grid.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement("div");
      div.className = "cell";

      if (cell !== 0) {
        div.innerText = cell;
        div.classList.add(`tile-${cell}`);

        // Add pop effect
        div.classList.add("new");
      }

      gridDiv.appendChild(div);
    });
  });

  document.getElementById("score").innerText = `Score: ${score}`;
}


document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
});

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let endY = e.changedTouches[0].clientY;

  let dx = endX - startX;
  let dy = endY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal swipe
    if (dx > 50) move("right");
    else if (dx < -50) move("left");
  } else {
    // Vertical swipe
    if (dy > 50) move("down");
    else if (dy < -50) move("up");
  }
});

function showGameOver(score) {
  const modal = document.getElementById("gameOverModal");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  document.getElementById("finalScore").innerText = `Score: ${score}`;
  document.getElementById("highScore").innerText = `High Score: ${highScore}`;

  modal.classList.remove("hidden");
}

function restartGame() {
  document.getElementById("gameOverModal").classList.add("hidden");
  startGame();
}

startGame();