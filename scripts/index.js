let player1Score = 0;
let player2Score = 0;
let currentPlayer;
let rollDiceButton = document.getElementById("rollBtn");
let resetButton = document.getElementById("resetBtn");
let headerElement = document.getElementById("player-header");
let firstPlayerFinalScoreCardElement =
  document.getElementById("player-1-score");
let secondPlayerFinalScoreCardElement =
  document.getElementById("player-2-score");
let firstPlayerLateScoreCardElement = document.getElementById(
  "player-1-latest-dice-score"
);
let secondPlayerLateScoreCardElement = document.getElementById(
  "player-2-latest-dice-score"
);

rollDiceButton.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);

/**
 *  starts the game and decides between two players on whom to give first chance
 */
function startGame() {
  currentPlayer = getRandomArbitrary(1, 3);
  headerElement.textContent = "Player " + currentPlayer + " Turn";
  changeActivePlayerButton();
}

function rollDice() {
  let newDiceValue = getRandomArbitrary(1, 7);
  if (currentPlayer == 1) {
    player1Score += newDiceValue;
    firstPlayerFinalScoreCardElement.textContent = player1Score;
    firstPlayerLateScoreCardElement.textContent = newDiceValue;
    if (player1Score >= 20) {
      gameOver(1);
      return;
    }
    currentPlayer = 2;
  } else {
    player2Score += newDiceValue;
    secondPlayerFinalScoreCardElement.textContent = player2Score;
    secondPlayerLateScoreCardElement.textContent = newDiceValue;
    if (player2Score >= 20) {
      gameOver(2);
      return;
    }
    currentPlayer = 1;
  }
  headerElement.textContent = "Player " + currentPlayer + " Turn";
  changeActivePlayerButton();
}

function decideTurn() {
  currentPlayer = getRandomArbitrary(1, 2);
}

function gameOver(whoWon = 1) {
  rollDiceButton.style.display = "none";
  resetButton.style.display = "block";
  currentPlayer = null;
  headerElement.textContent = "Player " + whoWon + " won 🥳";
  changeActivePlayerButton();
}
function resetGame() {
  rollDiceButton.style.display = "block";
  resetButton.style.display = "none";
  firstPlayerFinalScoreCardElement.textContent = "-";
  firstPlayerLateScoreCardElement.textContent = "-";
  secondPlayerFinalScoreCardElement.textContent = "-";
  secondPlayerLateScoreCardElement.textContent = "-";
  player1Score = 0;
  player2Score = 0;
  startGame();
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function changeActivePlayerButton() {
  if (currentPlayer == 1) {
    firstPlayerLateScoreCardElement.parentElement.classList.add("active");
    secondPlayerLateScoreCardElement.parentElement.classList.remove("active");
  } else if (currentPlayer == 2) {
    secondPlayerLateScoreCardElement.parentElement.classList.add("active");
    firstPlayerLateScoreCardElement.parentElement.classList.remove("active");
  } else {
    firstPlayerLateScoreCardElement.parentElement.classList.remove("active");
    secondPlayerLateScoreCardElement.parentElement.classList.remove("active");
  }
}

startGame();
