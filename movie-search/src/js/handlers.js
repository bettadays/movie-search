import {mySwiper} from './mySwiper';
import {app} from '../index.js';



export default function assignHandlers() {

  mySwiper.on('slideChange', function () {

console.log(app.currentIndex)
 //app.currentIndex = mySwiper.activeIndex;

    console.log('activeIndex', this.activeIndex);
    console.log('current page', app.currentPage);
    console.log('trigger', app.triggerLoadMoreSlides);
    if (mySwiper.activeIndex >= app.triggerLoadMoreSlides) {
      const stepToTriggerAdditionalRequest = 10;
      app.triggerLoadMoreSlides += stepToTriggerAdditionalRequest;
      app.currentPage += 1;
      app.loadMore = true;
      console.log(this.activeIndex);
      app.getMovies(app.movieRequest);


    }
  });


  const formField = document.querySelector('.form');

formField.addEventListener('submit', (e) => {
  e.preventDefault();
  app.movieRequest = document.querySelector('.search-field').value;
  app.currentPage = 1;
  app.currentIndex = 0;
  app.triggerLoadMoreSlides = 5;
  app.loadMore = false;

  if (app.controller instanceof AbortController) {
    app.controller.abort();
  }
  app.createController();
  app.getMovies(app.movieRequest);
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





}
