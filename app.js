const player = {
  name: 'Per',
  chips: 200,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';
const messageEl = document.getElementById('message-el');
const sumEl = document.querySelector('#sum-el');
const cardsEl = document.querySelector('#cards-el');
const playerEl = document.querySelector('#player-el');

playerEl.textContent = player.name + ': $' + player.chips;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 14) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (player.chips >= 10) {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    player.chips -= 10;
    playerEl.textContent = player.name + ': $' + player.chips;
    renderGame();
  } else {
    messageEl.textContent = "You don't have enough chips to play!";
  }
}

function renderGame() {
  sumEl.textContent = 'Sum: ' + sum;
  cardsEl.textContent = 'Cards: ';

  for (i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' ';
  }

  if (sum <= 20) {
    message = 'Do you want to draw a new card?';
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
  if (isAlive === true && hasBlackJack === false) {
    const card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
