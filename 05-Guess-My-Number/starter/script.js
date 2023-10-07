'use strict';
let target = Math.floor(Math.random() * 19 + 1);
let score = 20;
let highscore = 0;

//Set the input value = to the guess and update start guessing... text
const handleClick = () => {
  const guess = +document.querySelector('.guess').value;

  if (!guess) {
    alert('Please guess a number');
  } else if (guess === target) {
    highscore++;
    let text = 'You WIN!!!';
    document.querySelector('.message').textContent = text;
    document.querySelector('.number').textContent = guess;
    document.querySelector('.highscore').textContent = highscore;
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.backgroundColor = 'yellow';
  } else {
    if (score > 1) {
      score--;
      document.querySelector('.message').textContent =
        'Good Try - Guess Again!';
      document.querySelector('.score').textContent = score;
    } else {
      score--;
      document.querySelector('.message').textContent =
        'You Lose.  Please Play Again';
      document.querySelector('.score').textContent = score;
      document.querySelector('body').style.backgroundColor = 'red';
    }
  }

  console.log(`The score is: ${score}`);
  console.log(`The guess is: ${guess}`);
  console.log(`The target is: ${target}`);
};

const handleReset = () => {
  target = Math.floor(Math.random() * 19 + 1);
  score = 20;
  console.log(target);
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '';
  document.querySelector('.number').style.backgroundColor = '';
};

document.querySelector('.check').addEventListener('click', handleClick);
document.querySelector('.again').addEventListener('click', handleReset);

// document.querySelector('.guess').value = e.target.value;
