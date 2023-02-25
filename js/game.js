const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

// created variables to store setInterval from timer, and timeout to close card if no clicked in second card.
var loop, timeout;

const characters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

//generate a unique uuid
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`
    );
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  // added validation to check if id from two cards has difference, if has, continue.
  // it prevent to bug from click many times in one card and continue step function.  
  if (firstCharacter === secondCharacter && firstCard.id !== secondCard.id) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    // check if has a card with timeout to close, if has timeout, clear.
    timeout != null && clearTimeout(timeout);

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {

  // check if target is not reference to grid div
  if (!target.parentNode.classList.toString().includes("grid")) {
    
    // function to hidden card after 5 seconds
    timeout != null && clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (secondCard === "") {
        firstCard.classList.remove("reveal-card");
      }
    }, 1000 * 5);

    if (target.parentNode.className.includes("reveal-card")) {
      return;
    }

    if (firstCard === "") {
      target.parentNode.classList.add("reveal-card");
      firstCard = target.parentNode;
    } else if (secondCard === "") {
      target.parentNode.classList.add("reveal-card");
      secondCard = target.parentNode;

      checkCards();
    }
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  // added uuid to card
  const uuid = uuidv4();
  card.id = uuid;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  grid.innerHTML = "";
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {

  // check if startTimer has added before, if has added, clear and set a new.
  loop != null && clearInterval(this.loop);

  // set time value 0
  timer.innerHTML = 0;
  loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

//restart game
document.querySelector(".restart").addEventListener("click", () => {
  startTimer();
  loadGame();
});

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
