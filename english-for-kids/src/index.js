import cards from './js/cards';
import WordsList from './js/List';
import State from './js/lib/State';
import Menu from './js/Menu';
import Toggle from './js/Toggle';
import Page from './js/Page';


const appState = new State();
const wordsList = new WordsList(cards);
const toggle = new Toggle(appState);
const menu = new Menu(cards, appState);
const page = new Page(appState);

appState.update({
  mode: 'train',
  page: 'main',
  category: '',
});

appState.addObserver(wordsList);
appState.addObserver(menu);
appState.addObserver(toggle);

page.render();
menu.render(appState.get());
toggle.render(appState.get());
wordsList.render(appState.get());
