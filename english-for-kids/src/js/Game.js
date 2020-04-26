import Observer from './lib/Observer';


class PlayGame extends Observer {
  constructor(data = [], state = {}) {
    super();
    this.data = data;
    this.appState = state;
    this.stars = document.querySelector('.stars');
    this.list = document.querySelector('.cards-container');
    this.repeatBtn = document.querySelector('.game-controls-repeat');
    this.errors = 0;
    this.resultShown = false;
    this.task = [];
    this.game = {};
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleRepeatBtnClick = this.handleRepeatBtnClick.bind(this);
  }


  shuffle(data) {
    data.forEach((item) => {
      this.task.push(item.audioSrc);
    });
    this.task.sort(() => 0.5 - Math.random());
  }


  static playAudio(src) {
    const wordAudio = new Audio(src);
    wordAudio.play();
  }


  pronounce(task) {
    if (task.length > 0) {
      this.constructor.playAudio(`../assets/${task[task.length - 1]}`);
    } else {
      this.showResult(this.errors);
    }
  }


  reactToAnswer(answer) {
    if (answer.includes(this.task[this.task.length - 1])) {
      this.stars.innerHTML += '<div class="result-wrapper"> <img src="./src/assets/img/star-win.svg" alt=""> </div>';
      this.constructor.playAudio('../assets/audio/correct.mp3');
      this.task.pop();
      this.pronounce(this.task);
      return true;
    }

    this.stars.innerHTML += '<img src="./src/assets/img/star.svg" alt="">';
    this.constructor.playAudio('../assets/audio/error.mp3');
    this.errors += 1;
    return false;
  }


  showResult(errors) {
    if (errors === 0) {
      this.list.innerHTML = '<div class="game-result"> You won!<div style=\'background-image: url("./src/assets/img/success.jpg")\' class= "end-of-game"> </div></div>';
      this.constructor.playAudio('../assets/audio/success.mp3');
    } else {
      let result = `${this.errors} errors`;
      if (errors === 1) {
        result = `${this.errors} error`;
      }

      this.list.innerHTML = `<div class="game-result"> ${result} <br> Try more!<div style='background-image: url("./src/assets/img/failure.jpg")' class='end-of-game'> </div></div>`;
      this.constructor.playAudio('../assets/audio/failure.mp3');
    }

    this.resultShown = true;

    setTimeout(this.stopGame.bind(this), 3000);
  }

  stopGame() {
    this.stars.remove();
    this.repeatBtn.classList.remove('visible');
    this.list.removeEventListener('click', this.handleAnswerClick);
    this.repeatBtn.removeEventListener('click', this.handleRepeatBtnClick);
    this.task.length = 0;
    this.appState.removeObserver(this.game);


    const state = this.appState;


    if (this.resultShown) {
      state.page = 'main';
      state.mode = 'play';
      this.resultShown = false;
      this.appState.update(state);
    }
  }


  startGame(data, state, game) {
    this.data = data;
    this.state = state;
    this.shuffle(this.data);
    this.bindEvents();
    this.pronounce(this.task);
    this.game = game;
    this.appState.addObserver(this.game);
  }


  handleAnswerClick(e) {
    if (e.target.closest('.card') && !e.target.classList.contains('inactive')) {
      const answer = e.target.closest('.card').dataset.audio;
      if (this.reactToAnswer(answer)) {
        e.target.closest('.card').classList.add('inactive');
      }
    }
  }


  handleRepeatBtnClick() {
    this.pronounce(this.task);
  }


  bindEvents() {
    this.list.addEventListener('click', this.handleAnswerClick);
    this.repeatBtn.addEventListener('click', this.handleRepeatBtnClick);
  }


  update() {
    this.stopGame();
  }
}


export default PlayGame;
