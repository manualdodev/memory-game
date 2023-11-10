const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [//estabelece os pares de cartas, de acordo com cada elemento (no caso, serão 5 pares.)
  'facebook',
  'bb',
  'instagram',
  'nubank',
  'itau',
];

const createElement = (tag, className) => {//criar dinamicamente elementos HTML em JavaScript
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';//a princípio, duas cartas são selecionáveis e ainda não possuem um valor (até o usuário selecionar alguma).
let secondCard = '';

const checkEndGame = () => { //checa o fim do jogo
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 10) {//caso 10 cartas estejam desativadas, significa que o jogo acabou.
    clearInterval(this.loop);
    // Recupera os acertos e erros de cada site
    var resultbb = parseInt(localStorage.getItem('resultbb'), 10) || 0;
    var resultface = parseInt(localStorage.getItem('resultface'), 10) || 0;
    var resultinsta = parseInt(localStorage.getItem('resultinsta'), 10) || 0;
    var resultitau = parseInt(localStorage.getItem('resultitau'), 10) || 0;
    var resultnubank = parseInt(localStorage.getItem('resultnubank'), 10) || 0;

    // Realiza a soma aritmética dos resultados
    var resultadoTotal = resultbb + resultface + resultinsta + resultitau + resultnubank;

    // Exibe o resultado em um alert
    if (resultadoTotal < 3) {//o usuário será parabenizado somente caso faça 3 acertos ou mais.
      alert(`${spanPlayer.innerHTML}, Seu tempo foi de: ${timer.innerHTML} segundos. Você acertou ${resultadoTotal} sites. Seja mais atento(a) ao se deparar com algumas páginas!`);
    } else {
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos. Você acertou ${resultadoTotal} sites.`);
    }
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === 'facebook' && secondCharacter === 'facebook') {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    window.open('../pages/face.html', '_blank');
    localStorage.setItem('disabled-card', 'facebook');
    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);

  }
  if (firstCharacter === 'instagram' && secondCharacter === 'instagram') {
    window.open('../pages/insta.html', '_blank');
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
  if (firstCharacter === 'bb' && secondCharacter === 'bb') {
    window.open('../pages/bb.html', '_blank');
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
  if (firstCharacter === 'itau' && secondCharacter === 'itau') {
    window.open('../pages/itau.html', '_blank');
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
  if (firstCharacter === 'nubank' && secondCharacter === 'nubank') {
    window.open('../pages/nubank.html', '_blank');
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
