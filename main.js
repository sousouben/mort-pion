const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");
const scorePlayerOneElement = document.getElementById("scorePlayerOne");
const scorePlayerTwoElement = document.getElementById("scorePlayerTwo");
const playerOne = "X";
const playerTwo = "O";
let playerTurn = playerOne;
let scorePlayerOne = parseInt(localStorage.getItem("scorePlayerOne")) || 0;
let scorePlayerTwo = parseInt(localStorage.getItem("scorePlayerTwo")) || 0;
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//musique qui fait peur
document.addEventListener("DOMContentLoaded", function () {
  var backgroundMusic = document.getElementById("backgroundMusic");

  // Lecture automatique après une petite interaction utilisateur
  document.addEventListener("click", function () {
    backgroundMusic.play();
    // Retirez l'écouteur d'événement après la première interaction
    document.removeEventListener("click", arguments.callee);
  });

  updateScoreDisplay();
});

cells.forEach((cell) => {
  cell.addEventListener("click", playGame, { once: true });
});

function playGame(e) {
  e.target.style.color = playerTurn === playerOne ? "red" : "black";
  e.target.innerHTML = playerTurn;

  if (checkWin(playerTurn)) {
    if (playerTurn === playerOne) {
      scorePlayerOne++;
      if (scorePlayerOne === 10) {
        endGameStatus.innerHTML = "Le joueur 1 a gagné le match!";
        endGame();
        localStorage.removeItem("scorePlayerOne");
        localStorage.removeItem("scorePlayerTwo");
        scorePlayerOne = 0;
        scorePlayerTwo = 0;
        updateScoreDisplay();
        return;
      }
    } else {
      scorePlayerTwo++;
      if (scorePlayerTwo === 10) {
        endGameStatus.innerHTML = "Le joueur 2 a gagné le match!";
        endGame();
        localStorage.removeItem("scorePlayerOne");
        localStorage.removeItem("scorePlayerTwo");
        scorePlayerOne = 0;
        scorePlayerTwo = 0;
        updateScoreDisplay();
        return;
      }
    }
    localStorage.setItem("scorePlayerOne", scorePlayerOne);
    localStorage.setItem("scorePlayerTwo", scorePlayerTwo);
    updateGameStatus("wins" + playerTurn);
    updateScoreDisplay();
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }

  updateGameStatus(playerTurn);
  playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne);
}

function checkWin(playerTurn) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML == playerTurn;
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

function updateGameStatus(status) {
  let statusText;

  switch (status) {
    case "X":
      statusText = "Au tour du joueur 2 (O)";
      break;
    case "O":
      statusText = "Au tour du joueur 1 (X)";
      break;
    case "winsX":
      statusText = "Le joueur 1 a gagné!";
      break;
    case "winsO":
      statusText = "Le joueur 2 a gagné!";
      break;
    case "draw":
      statusText = "Egalité! Personne ne gagne!";
      break;
  }

  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}

function endGame() {
  document.getElementById("gameEnd").style.display = "block";
}

function reloadGame() {
  window.location.reload();
}

function updateScoreDisplay() {
  scorePlayerOneElement.textContent = scorePlayerOne;
  scorePlayerTwoElement.textContent = scorePlayerTwo;
}
