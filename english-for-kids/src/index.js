import cards from './js/cards.js';
import {CategoriesList} from './js/CategoriesList.js';
import {WordsList} from './js/WordsList.js';




const modePlay = false;
let cardRotated = false;

// const categoriesList = new CategoriesList(cards);
// categoriesList.generate();

const wordsList = new WordsList(cards,'Landscape', 'train');
wordsList.generate();


const mode = document.querySelector('.mode');
const modeName = document.querySelector('.mode__name');
const toggle = document.querySelector('.mode__toggle');

mode.addEventListener('click', () => {
  if (mode.classList.contains('mode_toggled')) {
    modeName.innerHTML = 'TRAIN';
  } else modeName.innerHTML = 'PLAY';
  mode.classList.toggle('mode_toggled');
  modeName.classList.toggle('mode__name_toggled');
  toggle.classList.toggle('mode__toggle_toggled');
});

let menuOpened = false;
const hamburger = document.querySelector('.hamburger');
const hamburgerLineOne = document.querySelector('.hamburger__line-1');
const hamburgerLineTwo = document.querySelector('.hamburger__line-2');
const hamburgerLineThree = document.querySelector('.hamburger__line-3');
const menu = document.querySelector('.menu-wrapper');


const toggleMenu = (e) => {
  menuOpened = !menuOpened;
  hamburgerLineOne.classList.toggle('hamburger__line-1_clicked');
  hamburgerLineTwo.classList.toggle('hamburger__line-2_clicked');
  hamburgerLineThree.classList.toggle('hamburger__line-3_clicked');
  menu.classList.toggle('visible');
  if (e.currentTarget.classList.contains('hamburger')) {
    e.stopPropagation();
  }
};

hamburger.addEventListener('click', toggleMenu);

document.addEventListener('click', (e) => {
  const isOutsideOfMenu = e.target.closest('.menu-wrapper');
  if (isOutsideOfMenu == null && menuOpened) {
    toggleMenu(e);
  }
});


const cardsContainer = document.querySelector('.cards-container');


cardsContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('word-card__rotate-btn')) {
  cardRotated = !cardRotated;
  const card = e.target.closest('.card');
  card.classList.add('card_rotated');
}
});

//const card = document.querySelector('.card');

cardsContainer.addEventListener('mouseout', (e) => { // rewrite since now event delegation;
  if(e.target.closest('.word-card')) {
  const currentElCheck = e.relatedTarget.closest('.card');
  if (cardRotated && !currentElCheck) {
    const card = e.target.closest('.card_rotated');
    card.classList.remove('card_rotated');//
    cardRotated = !cardRotated;
  }
}
});



cardsContainer.addEventListener('click', (e) => {
  if(e.target.closest('.word-card') && !cardRotated && !e.target.classList.contains('word-card__rotate-btn')) {
    const audioSrc = e.target.closest('.card').dataset.audio;
    const audio = new Audio(audioSrc);
    audio.play();
  }
})




