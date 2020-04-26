class Page {
  constructor(state = {}) {
    this.appState = state;
    this.cardRotated = false;
  }

  static createMarkup() {
    return `<div class="cards-container">
      </div>`;
  }

  render() {
    const parent = document.querySelector('.page');
    parent.innerHTML = this.constructor.createMarkup();
    this.bindEvents();
  }

  bindEvents() {
    const cardsContainer = document.querySelector('.cards-container');

    cardsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.category-card')) {
        let category;

        if (e.target.classList.contains('category-card__name')) {
          category = e.target.innerHTML;
        } else if (e.target.classList.contains('category-card__img')) {
          category = e.target.nextElementSibling.innerHTML;
        } else if (e.target.closest('.category-card')) {
          category = e.target.children[1].innerHTML;
        }

        const state = this.appState.get();
        state.category = category;
        state.page = 'category';
        this.appState.update(state);
      }
    });


    cardsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('word-card__rotate-btn')) {
        this.cardRotated = !this.cardRotated;
        const card = e.target.closest('.card');
        card.classList.add('card_rotated');
      }
    });

    cardsContainer.addEventListener('mouseout', (e) => {
      if (e.target.closest('.word-card')) {
        const currentElCheck = e.relatedTarget.closest('.card');
        if (this.cardRotated && !currentElCheck) {
          const card = e.target.closest('.card_rotated');
          card.classList.remove('card_rotated'); //
          this.cardRotated = !this.cardRotated;
        }
      }
    });

    cardsContainer.addEventListener('click', (e) => {
      const state = this.appState.get();
      if (e.target.closest('.word-card') && state.mode === 'train' && !this.cardRotated && !e.target.classList.contains('word-card__rotate-btn')) {
        const audioSrc = e.target.closest('.card').dataset.audio;
        const audio = new Audio(audioSrc);
        audio.play();
      }
    });
  }
}

export default Page;
