import mySwiper from './mySwiper';


export default function assignHandlers(app) {
  const application = app;
  mySwiper.on('slideChange', () => {
    if (mySwiper.activeIndex >= application.triggerLoadMoreSlides) {
      const stepToTriggerAdditionalRequest = 10;
      application.triggerLoadMoreSlides += stepToTriggerAdditionalRequest;
      application.currentPage += 1;
      application.loadMore = true;
      application.getMovies(application.movieRequest);
    }
  });


  const formField = document.querySelector('.form');

  formField.addEventListener('submit', (e) => {
    e.preventDefault();
    application.movieRequest = document.querySelector('.search-field').value;
    application.currentPage = 1;
    application.currentIndex = 0;
    application.triggerLoadMoreSlides = 5;
    application.loadMore = false;

    if (application.controller instanceof AbortController) {
      application.controller.abort();
    }
    application.createController();
    application.getMovies(application.movieRequest);
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
