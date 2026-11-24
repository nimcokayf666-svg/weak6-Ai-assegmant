const choices = ["dhagax", "warqad", "mudac"];
const emojis = { dhagax: "✊", warqad: "✋", mudac: "✌️" };
const WIN_SCORE = 5;

let score = { player: 0, computer: 0 };
let gameActive = false;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const playerPickEl = document.getElementById("playerPick");
const computerPickEl = document.getElementById("computerPick");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const choiceButtons = document.querySelectorAll(".choice");

function setChoicesEnabled(enabled) {
  choiceButtons.forEach(function (btn) {
    btn.disabled = !enabled;
  });
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message" + (type ? " " + type : "");
}

function updateScore() {
  playerScoreEl.textContent = score.player;
  computerScoreEl.textContent = score.computer;
}

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getWinner(player, computer) {
  if (player === computer) {
    return "draw";
  } else if (player === "dhagax" && computer === "mudac") {
    return "player";
  } else if (player === "warqad" && computer === "dhagax") {
    return "player";
  } else if (player === "mudac" && computer === "warqad") {
    return "player";
  } else {
    return "computer";
  }
}

function startGame() {
  score = { player: 0, computer: 0 };
  gameActive = true;
  updateScore();
  playerPickEl.textContent = "❔";
  computerPickEl.textContent = "❔";
  setChoicesEnabled(true);
  startBtn.disabled = true;
  showMessage("Ciyaarta waa bilaabatay! Dooro mid.", "");
}

function endGame(winner) {
  gameActive = false;
  setChoicesEnabled(false);
  startBtn.disabled = true;

  if (winner === "player") {
    showMessage("🎉 WAAD GUULEYSATAY! Hambalyo!", "win");
  } else {
    showMessage("😢 WAAD DHIMATAY! Kombiyuutarku wuu guuleystay.", "lose");
  }
}

function playRound(playerChoice) {
  if (!gameActive) return;

  const computerChoice = getComputerChoice();
  const result = getWinner(playerChoice, computerChoice);

  playerPickEl.textContent = emojis[playerChoice];
  computerPickEl.textContent = emojis[computerChoice];

  if (result === "player") {
    score.player++;
    showMessage("Wuu kaa guuleystay wareegan! 👍", "win");
  } else if (result === "computer") {
    score.computer++;
    showMessage("Kombiyuutarku wuu guuleystay wareegan. 👎", "lose");
  } else {
    showMessage("Barbar! 🤝", "draw");
  }

  updateScore();

  if (score.player === WIN_SCORE) {
    endGame("player");
  } else if (score.computer === WIN_SCORE) {
    endGame("computer");
  }
}

function restartGame() {
  score = { player: 0, computer: 0 };
  gameActive = false;
  updateScore();
  playerPickEl.textContent = "❔";
  computerPickEl.textContent = "❔";
  setChoicesEnabled(false);
  startBtn.disabled = false;
  showMessage('Riix "Bilow" si aad u bilowdo ciyaarta.', "");
}

choiceButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    playRound(btn.dataset.choice);
  });
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);