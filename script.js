'use strict';

// SELECTING ELEMENTS

const resetBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');
const diceEl = document.getElementById('dice');
const score0El = document.querySelector('#score--0');
const player0El = document.querySelector('.player--0');
const current0El = document.querySelector('#current--0');
const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');

// VARIABLES

let currentScore = 0;

// Rolling dice functionality

rollBtn.addEventListener('click', function () {
  const verify = verifyWinner();
  if (!verify) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.webp`;
    if (dice !== 1) {
      currentScore += dice;
      if (player0El.classList.contains('player--active')) {
        current0El.textContent = currentScore;
      } else {
        current1El.textContent = currentScore;
      }
    } else {
      if (player0El.classList.contains('player--active')) {
        current0El.textContent = 0;
      } else {
        current1El.textContent = 0;
      }
      currentScore = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
    verifyWinner();
  } else {
    return;
  }
});

holdBtn.addEventListener('click', function () {
  const verify = verifyWinner();
  if (!verify) {
    if (player0El.classList.contains('player--active')) {
      score0El.textContent =
        parseInt(score0El.textContent) + parseInt(current0El.textContent);
    } else {
      score1El.textContent =
        parseInt(score1El.textContent) + parseInt(current1El.textContent);
    }
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    currentScore = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    verifyWinner();
  } else {
    return;
  }
});

resetBtn.addEventListener('click', function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  diceEl.classList.add('hidden');
});

function verifyWinner() {
  if (score0El.textContent >= 100) {
    player0El.classList.add('player--winner');
    return true;
  } else if (score1El.textContent >= 100) {
    player1El.classList.add('player--winner');
    return true;
  } else {
    return false;
  }
}
