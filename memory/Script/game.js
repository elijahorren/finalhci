const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid");
const restartButton = document.querySelector(".restartButton");

const characters = [
  "beth",
  "morty",
  "jessica",
  "rick",
  "summer",
  "meeseeks",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let time = 0;
let timerId = null;

function startTimer() {
  timerId = setInterval(function () {
    time = time + 1;
    timer.textContent = time;
  }, 1000);
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function createCard(character) {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");
  front.style.backgroundImage = "url('../images/" + character + ".png')";
  card.setAttribute("data-character", character);
  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", handleCardClick);
  return card;
}

function loadGame() {
  const cardArray = characters.concat(characters);
  cardArray.sort(function () {
    return Math.random() - 0.5;
  });
  cardArray.forEach(function (character) {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

function handleCardClick(event) {
  const card = event.currentTarget;
  if (lockBoard) {
    return;
  }
  if (card === firstCard) {
    return;
  }
  card.classList.add("reveal-card");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  checkCards();
}

function checkCards() {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add("disabled-card");
    secondCard.classList.add("disabled-card");
    matches = matches + 2;
    resetBoard();
    checkEndGame();
  } else {
    setTimeout(function () {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
      resetBoard();
    }, 800);
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkEndGame() {
  const totalCards = characters.length * 2;
  if (matches === totalCards) {
    clearInterval(timerId);
    setTimeout(function () {
      alert("You won in " + time + " seconds!");
    }, 200);
  }
}

restartButton.addEventListener("click", function () {
  grid.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matches = 0;
  time = 0;
  timer.textContent = "0";
  clearInterval(timerId);
  startTimer();
  loadGame();
});

window.addEventListener("load", function () {
  const playerName = localStorage.getItem("playerName");
  if (playerName) {
    spanPlayer.textContent = playerName;
  }
  startTimer();
  loadGame();
});
