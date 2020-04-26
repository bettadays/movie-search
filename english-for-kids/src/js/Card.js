import Observer from './lib/Observer';

class Card extends Observer {
  constructor(category = '', categoryImg = '', {
    word,
    translation,
    image,
    audioSrc,
  } = {}) {
    super();
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.category = category;
    this.categoryImg = categoryImg;
  }

  createMarkup(state) {
    let content = '';
    if (state.page === 'category' && state.mode === 'train') {
      content = `
        <div class="card-wrapper">
          <div class="card" data-audio="../assets/${this.audioSrc}">
            <a href="#/cards" class="word-card word-card-front">
              <div class="word-card__img" style="background-image: url(../assets/${this.image}"></div>
              <div class="word-card__name">${this.word}
                <i class="fas fa-sync-alt word-card__rotate-btn"></i>
              </div>
            </a>
            <a href="#/cards" class="word-card word-card-back">
              <div class="word-card__img" style="background-image: url(../assets/${this.image}"></div>
              <div class="word-card__name">${this.translation} </div>
            </a>
          </div>
        </div>`;
    } else if (state.page === 'category' && state.mode === 'play') {
      content = `
      <div class="card-wrapper">
            <div class="card"  data-audio="../assets/${this.audioSrc}">
              <a href="#/cards" class="word-card word-card-front play">
                <div class="word-card__img" style="background-image: url(../assets/${this.image}"></div>
              </a>
            </div>
            </div>
            `;
    } else if (state.page === 'main' && state.mode === 'train') {
      content = `
        <a href="#/cards" class="category-card">
             <div class="category-card__img" style="background-image: url(../assets/${this.categoryImg}"></div>
             <div class="category-card__name">${this.category}</div>
           </a>`;
    } else {
      content = `
        <a href="#/cards" class="category-card play">
             <div class="category-card__img" style="background-image: url(../assets/${this.categoryImg}"></div>
             <div class="category-card__name">${this.category}</div>
           </a>`;
    }

    return content;
  }

  render(state) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML += this.createMarkup(state);
  }

  update(state) {
    this.render(state);
  }
}

export default Card;
