const cells = document.querySelectorAll(".box1");
const restartButton = document.getElementById("restart");
const xScoreElement = document.getElementById("x-score");
const oScoreElement = document.getElementById("o-score");
const xCountElement = document.getElementById("x-count");
const oCountElement = document.getElementById("o-count");
let currentPlayer = "X";
let board = Array(9).fill(null);
let gameOver = false;
let xScore = 0;
let oScore = 0;
let xCount = 5;
let oCount = 5;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      highlightWinningCells(a, b, c);
      updateScore(board[a]);
      return;
    }
  }

  if (!board.includes(null)) {
    gameOver = true;
  }
}

function highlightWinningCells(a, b, c) {
  cells[a].classList.add("winning");
  cells[b].classList.add("winning");
  cells[c].classList.add("winning");
}

function updateScore(winner) {
  if (winner === "X") {
    xScore++;
    xScoreElement.textContent = xScore;
  } else if (winner === "O") {
    oScore++;
    oScoreElement.textContent = oScore;
  }
}

function updateCount(player) {
  if (player === "X" && xCount > 0) {
    xCount--;
    xCountElement.removeChild(xCountElement.lastElementChild);
  } else if (player === "O" && oCount > 0) {
    oCount--;
    oCountElement.removeChild(oCountElement.lastElementChild);
  }
}

function handleClick(event) {
  const index = event.target.dataset.index;

  if (!board[index] && !gameOver) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    updateCount(currentPlayer);
    checkWinner();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateBlinkEffect();
}

function updateBlinkEffect() {
  if (currentPlayer === "X") {
    xCountElement.classList.add("blink");
    oCountElement.classList.remove("blink");
  } else {
    oCountElement.classList.add("blink");
    xCountElement.classList.remove("blink");
  }
}

function restartGame() {
  board = Array(9).fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
  currentPlayer = "X";
  gameOver = false;
  resetCounts();
  updateBlinkEffect();
}

function resetCounts() {
  xCount = 5;
  oCount = 5;
  xCountElement.innerHTML =
    "<li>X</li><li>X</li><li>X</li><li>X</li><li>X</li>";
  oCountElement.innerHTML =
    "<li>O</li><li>O</li><li>O</li><li>O</li><li>O</li>";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);

// Initialize the blinking effect on page load
updateBlinkEffect();
