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

/**
 *  starts the game and decides between two players on whom to give first chance
 */
const startGame = () => {
  currentPlayer = getRandomArbitrary(1, 3);
  headerElement.textContent = `Player ${currentPlayer} Turn`;
  changeActivePlayerButton();
};

/**
 *
 * @returns roles the dice
 */
const rollDice = () => {
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
  headerElement.textContent = `Player ${currentPlayer} Turn`;
  changeActivePlayerButton();
};

const gameOver = (whoWon = 1) => {
  rollDiceButton.style.display = "none";
  resetButton.style.display = "block";
  currentPlayer = null;
  headerElement.textContent = `Player ${whoWon} won 🥳`;
  changeActivePlayerButton();
};

const resetGame = () => {
  rollDiceButton.style.display = "block";
  resetButton.style.display = "none";
  firstPlayerFinalScoreCardElement.textContent = "-";
  firstPlayerLateScoreCardElement.textContent = "-";
  secondPlayerFinalScoreCardElement.textContent = "-";
  secondPlayerLateScoreCardElement.textContent = "-";
  player1Score = 0;
  player2Score = 0;
  startGame();
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const changeActivePlayerButton = () => {
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
};

startGame();

rollDiceButton.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);
