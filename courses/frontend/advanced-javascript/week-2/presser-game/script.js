import JSConfetti from "https://cdn.jsdelivr.net/npm/js-confetti@0.11.0/dist/es/index.js";

const inputField = document.querySelector(".seconds-input");
const gameForm = document.querySelector("form");

const scoreS = document.querySelector(".player-s-score");
const scoreL = document.querySelector(".player-l-score");
const startButton = document.querySelector(".start-button");

let isGameRunning = false;
let countS = 0;
let countL = 0;

const jsConfettiS = new JSConfetti({
  canvas: document.getElementById("confetti-s"),
});
const jsConfettiL = new JSConfetti({
  canvas: document.getElementById("confetti-l"),
});

gameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const gameTime = parseInt(inputField.value);

  startGame(gameTime);
});

window.addEventListener("keydown", (event) => {
  if (!isGameRunning) return;

  const key = event.key.toLowerCase();

  if (key === "s") {
    countS++;
    scoreS.innerText = countS;
  } else if (key === "l") {
    countL++;
    scoreL.innerText = countL;
  }
});

function startGame(time) {
  countS = 0;
  countL = 0;
  scoreS.innerText = "";
  scoreL.innerText = "";

  isGameRunning = true;
  startButton.disabled = true;

  setTimeout(() => {
    isGameRunning = false;
    startButton.disabled = false;
    findWinner();
  }, time * 1000);
}

function findWinner() {
  if (countS > countL) {
    scoreS.innerText = " Player Wins!!! 🏆";
    scoreL.innerText = "";
    jsConfettiS.addConfetti({
      emojis: ["S", "💥", "L", "✨"],

      confettiNumber: 30,
      scalar: 4,
    });
  } else if (countL > countS) {
    scoreS.innerText = "";
    scoreL.innerText = " Player Wins!!! 🏆";
    jsConfettiL.addConfetti({
      emojis: ["S", "💥", "L", "✨"],
      confettiNumber: 30,
      scalar: 4,
    });
  } else {
    scoreS.innerText = "Try again";
    scoreL.innerText = "Try again";
  }
}
