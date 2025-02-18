const cards = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById('reset-button');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = cards.length / 2; 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    matchedPairs++;

    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        showPopup();
      }, 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * totalPairs * 2);
    card.style.order = randomPos;
  });
})();

function resetGame() {
  location.reload();
}

resetButton.addEventListener('click', resetGame);
cards.forEach(card => card.addEventListener('click', flipCard));

function showPopup() {
  const popup = document.createElement('div');
  popup.innerHTML = `
    <div class="popup-overlay">
      <div class="popup-box">
        <h2>🎉 Congratulations! You've completed the challenge! 🏆</h2>
        <p>You’ve just unlocked the power of Maybank's T.I.G.E.R. Core Values:</p>
        <p>
          <strong>T:</strong> Teamwork <br>
          <strong>I:</strong> Integrity <br>
          <strong>G:</strong> Growth <br>
          <strong>E:</strong> Excellence & Efficiency <br>
          <strong>R:</strong> Relationship Building
        </p>
        <p>These core values are the foundation of Maybank’s culture, guiding how we work and interact every day!</p>
        <button id="close-popup">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById('close-popup').addEventListener('click', () => {
    document.querySelector('.popup-overlay').remove();
  });
}
