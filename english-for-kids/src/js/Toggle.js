import cards from './cards';
import PlayGame from './Game';


class Header {
  constructor(state = {}) {
    this.appState = state;
  }

  static createMarkup(state) {
    return `
      <div class="mode ${state.mode === 'play' ? 'mode_toggled' : ''}">
        <div class="mode__name ${state.mode === 'play' ? 'mode__name_toggled' : ''}"> ${state.mode === 'play' ? 'PLAY' : 'TRAIN'} </div>
        <div class="mode__toggle   ${state.mode === 'play' ? 'mode__toggle_toggled' : ''}"> </div>
      </div>
          <div class='game-controls'>
          <button class='game-controls-start ${state.mode === 'play' && state.page === 'category' ? 'visible' : ''}'>START GAME</button>
      <button class='game-controls-repeat'>REPEAT</button>
    </div>`;
  }

  render(state) {
    const parent = document.querySelector('.mode-wrapper');
    parent.innerHTML = this.constructor.createMarkup(state);
    this.bindEvents();
  }

  update(state) {
    this.render(state);
  }

  bindEvents() {
    const mode = document.querySelector('.mode');
    const playBtn = document.querySelector('.game-controls-start');
    const repeatBtn = document.querySelector('.game-controls-repeat');
    const state = this.appState.get();

    mode.addEventListener('click', () => {
      if (state.mode === 'train') {
        state.mode = 'play';
        this.appState.update(state);
      } else {
        state.mode = 'train';
        this.appState.update(state);
      }


      if (state.page === 'category' && state.mode === 'play') {
        playBtn.classList.add('visible');
      } else {
        playBtn.classList.remove('visible');
      }
    });

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.target.classList.remove('visible');
        repeatBtn.classList.add('visible');
        const stars = document.createElement('div');
        const sibling = document.querySelector('.header');
        sibling.after(stars);
        stars.classList.add('stars');

        const currentCategory = state.category;
        const dataForGame = cards.filter((item) => item.catName === currentCategory)[0].data;
        const game = new PlayGame([], this.appState);
        game.startGame(dataForGame, this.appState, game);
      });
    }
  }
}


export default Header;
