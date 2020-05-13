import 'babel-polyfill';
import { mySwiper } from './js/mySwiper';
import { state, getMovies, createController } from './js/request';


mySwiper.init();


const formField = document.querySelector('.form');

formField.addEventListener('submit', (e) => {
  e.preventDefault();
  state.movieRequest = document.querySelector('.search-field').value;
  state.currentPage = 1;
  state.loadMore = false;

  if (state.controller instanceof AbortController) {
    state.controller.abort();
  }
  createController();
  getMovies(state.movieRequest);
});


const search = document.querySelector('.search-field');

search.addEventListener('input', () => {
  if (search.validity.valueMissing
    || search.validity.tooShort) {
    search.setCustomValidity('Name of movie should be at least 3 caracters long');
  } else {
    search.setCustomValidity('');
  }
});

getMovies('dream');
