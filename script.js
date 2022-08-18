'use strict';

const bodyElem = document.querySelector('body');
const leftContainer = document.querySelector('#left');
const restartContainer = document.querySelector('#restart');
const inputElem = document.querySelector('#guess');
const msgElem = document.querySelector('#message');
const numberElem = document.querySelector('#number');
const scoreElem = document.querySelector('#score');
const highscoreElem = document.querySelector('#highscore');
const checkBtn = document.querySelector('#check');
const restartBtn = document.querySelector('#btn-restart');

let secretNumber = randomizeNumber();
let score = 20;
let highscore = 0;

console.log(secretNumber);

// EVENT LISTENERS

checkBtn.addEventListener('click', () => {
  const guess = Number(inputElem.value);

  // When there is no input
  if (!guess) {
    displayMessage('No number!');

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;

      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      updateScore(score);
    } else {
      gameOver();
      updateScore('0');
    }

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('You won!');
    updateDisplay(secretNumber);
    changeBackground('#60b347');
    toggleVisibility(leftContainer, restartContainer);

    if (score > highscore) {
      updateHighscore();
    }
  }
});

restartBtn.addEventListener('click', () => {
  restartGame();
});

// FUNCTIONS

function randomizeNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(message) {
  msgElem.textContent = message;
}

function updateScore(number) {
  scoreElem.textContent = number;
}

function updateHighscore() {
  highscore = score;
  highscoreElem.textContent = highscore;
}

function changeBackground(color) {
  bodyElem.style.backgroundColor = `${color}`;
}

function updateDisplay(text) {
  numberElem.textContent = text;
}

function toggleVisibility(elem1, elem2) {
  elem1.classList.add('hide');
  elem2.classList.remove('hide');
}

function restartGame() {
  secretNumber = randomizeNumber();
  score = 20;

  toggleVisibility(restartContainer, leftContainer);
  displayMessage('Start guessing...');
  updateScore('20');
  changeBackground('#222');
  updateDisplay('?');

  inputElem.value = '';
}

function gameOver() {
  displayMessage('You lost the game.');
  toggleVisibility(leftContainer, restartContainer);
}
