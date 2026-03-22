const API = "";

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
    alert("Game Over!");
  }
}

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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
});

startGame();