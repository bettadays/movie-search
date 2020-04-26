import WordCard from './Card';
import Observer from './lib/Observer';

class List extends Observer {
  constructor(data) {
    super();
    this.data = data;
  }

  render(state) {
    const cardsContainer = document.querySelector('.cards-container');
    const playBtn = document.querySelector('.game-controls-start');

    cardsContainer.innerHTML = `<h2 class='category-name'> ${state.category} </h2>`;

    if (state.mode === 'play' && state.page === 'category' && playBtn) {
      playBtn.classList.add('visible');
    }

    if (state.page === 'category') {
      this.data.forEach((item) => {
        if (item.catName === state.category) {
          item.data.forEach((obj) => {
            const wordCard = new WordCard('', '', obj);
            wordCard.update(state);
          });
        }
      });
    } else if (state.page === 'main') {
      this.data.forEach((item) => {
        const categoryCard = new WordCard(item.catName, item.data[0].image);
        categoryCard.update(state);
      });
    }
  }

  update(state) {
    this.render(state);
  }
}

export default List;
