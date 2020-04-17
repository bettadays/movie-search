export class WordCard {
  constructor ({word, translation, image, audioSrc}, state) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.state = state;
  }
  generate() {
    if (this.state === 'train') {
    const cardsContainer = document.querySelector('.cards-container');
    let content =  '';
    content += `
        <div class="card-wrapper">
          <div class="card" data-audio="../assets/${this.audioSrc}">
            <a href="#" class="word-card word-card-front">
              <div class="word-card__img" style="background-image: url(../assets/${this.image}"></div>
              <div class="word-card__name">${this.word}
                <i class=" word-card__rotate-btn"></i>
              </div>
            </a>
            <a href="#" class="word-card word-card-back">
              <div class="word-card__img" style="background-image: url(../assets/${this.image}"></div>
              <div class="word-card__name">${this.translation} </div>
            </a>
          </div>
        </div>`;
    cardsContainer.innerHTML += content;
  }

 else if (this.state === 'play') {
    const cardsContainer = document.querySelector('.cards-container');
    let content =  '';
    content += `
            <div class="card">
              <a href="#" class="word-card word-card-front">
                <div class="word-card__img" style="background-image: url(../assets/${this.image}"></div>
              </a>
            </div>
            `;
    cardsContainer.innerHTML += content;
  }
  }
}
