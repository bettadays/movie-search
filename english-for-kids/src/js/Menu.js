class Menu {
  constructor(data, state) {
    this.data = data;
    this.state = state;
  }

  createMarkup(state) {
    return `
    <nav class="menu-wrapper ${state.mode === 'play' ? 'play' : ''}">
        <ul class="menu">
          <a href="#/" class="menu__item ${state.mode === 'play' ? 'play' : ''} ${state.page === 'main' ? 'underlined' : ''}" >
            <li>Main page</li>
          </a>

          ${
  this.data.map((item) => `<a href="#/cards" class="menu__item ${item.catName === state.category ? 'underlined' : ''} ${state.mode === 'play' ? 'play' : ''}">
            <li>${item.catName}</li>
          </a>`).join('\n')
}
                 </ul>
      </nav>
            <div class="hamburger">
        <div class="hamburger__line hamburger__line-1"></div>
        <div class="hamburger__line hamburger__line-2"></div>
        <div class="hamburger__line hamburger__line-3"></div>
      </div>
    `;
  }

  render(state) {
    const parent = document.querySelector('.menu');
    parent.innerHTML = this.createMarkup(state);
    this.bindEvents(state);
  }

  update(state) {
    this.render(state);
  }

  bindEvents() {
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

      if (menuOpened && e.currentTarget.classList.contains('hamburger')) {
        e.stopPropagation();
      }
    };


    document.addEventListener('click', (e) => {
      const isOutsideOfMenu = e.target.closest('.menu-wrapper');
      if (isOutsideOfMenu === null && menuOpened) {
        toggleMenu(e);
      }
    });


    hamburger.addEventListener('click', toggleMenu);
    menu.addEventListener('click', (e) => {
      const item = e.target.closest('.menu__item');

      if (item) {
        if (e.target.innerHTML === 'Main page') {
          const appState = this.state.get();
          appState.category = '';
          appState.page = 'main';
          this.state.update(
            appState,
          );
        } else {
          const category = e.target.innerHTML;
          const appState = this.state.get();
          appState.category = category;
          appState.page = 'category';

          this.state.update(appState);
        }
      }
    });
  }
}

export default Menu;
