import mySwiper from './mySwiper';
import Slide from './Slide';
import * as constants from './constants/constants';

export default class App {
  constructor() {
    this.currentPage = 1;
    this.movieRequest = constants.INIT_MOVIE_REQUEST;
    this.loadMore = false;
    this.controller = {};
    this.controllerSignal = {};
    this.triggerLoadMoreSlides = 5;
    this.currentIndex = 0;
    this.firstRender = true;
  }

  createController() {
    const controller = new AbortController();
    this.controller = controller;
    this.controllerSignal = controller.signal;
  }

  createRequest(movie, mode) {
    const apiKeyImdb = constants.API_KEY_OMDB;
    const requestMode = (mode === 'search' ? 's' : 'i');
    const encodedMovieTitle = encodeURI(movie);
    const url = `${constants.BASE_URL_OMDB}${apiKeyImdb}&${requestMode}=${encodedMovieTitle}&page=${this.currentPage}&type=movie`;
    return url;
  }

  static showInfo(selector, message, type) {
    const error = document.querySelector(`${selector}`);
    if (type === 'error') {
      error.style.color = constants.ERROR_MSG_COLOR;
    } else {
      error.style.color = constants.INFO_MSG_COLOR;
    }
    error.innerHTML = message;
  }


  async translateRUtoEN(request) {
    try {
      const apiKeyYandex = constants.API_KEY_YANDEX;
      const response = await fetch(`${constants.BASE_URL_YANDEX}${apiKeyYandex}&text=${request}&lang=ru-en`);

      if (response.ok) {
        const translation = await response.json();
        [this.movieRequest] = translation.text;
        return translation.text[0];
      }
    } catch (err) {
      this.constructor.showInfo('.error-noerror', constants.CONNECTION_LOST, 'error');
    }
    return null;
  }


  async getRating(movieID) {
    try {
      const response = await fetch(this.createRequest(movieID, 'byMovie'), this.controllerSignal);
      if (response.ok) {
        const movieData = await response.json();
        return movieData.imdbRating;
      }
    } catch (err) {
      this.constructor.showInfo('.error-noerror', constants.CONNECTION_LOST, 'error');
    }
    return null;
  }

  renderResponse(response) {
    const slides = [];
    response.Search.forEach((movie) => {
      const slide = new Slide(movie);
      slides.push(slide.createMarkup());
    });
    if (!this.loadMore) {
      mySwiper.removeAllSlides();
      mySwiper.slideTo(0);
      mySwiper.appendSlide(slides);
    } else {
      mySwiper.appendSlide(slides);
    } if (this.firstRender !== true) {
      this.constructor.showInfo('.error-noerror', `${constants.RESULTS_FOR} '${this.movieRequest}'`);
      this.constructor.showInfo('.total-results', `${response.totalResults} ${constants.MOVIES_FOUND}`);
    }
  }


  async getMovies(userInput) {
    const loader = document.querySelector('.loader');
    const isCyrillic = /[а-яё]/ig.test(userInput);
    let translatedUserInput = userInput;
    if (isCyrillic) {
      translatedUserInput = await this.translateRUtoEN(userInput);
    }

    try {
      loader.classList.toggle('visible');
      const response = await fetch(this.createRequest(translatedUserInput, 'search'), this.controllerSignal);

      if (response.ok) {
        const moviesData = await response.json();

        if (moviesData.Response === 'False') {
          let errorMsg = '';

          if (moviesData.Error === 'Movie not found!') {
            errorMsg = `${constants.NO_RESULTS} '${this.movieRequest}'`;
          } else {
            errorMsg = `${moviesData.Error}`;
          }
          this.constructor.showInfo('.error-noerror', errorMsg, 'error');
        }

        const ratingArr = [];
        if (moviesData.Search) {
          moviesData.Search.forEach((movie) => {
            ratingArr.push(this.getRating(movie.imdbID));
            const movie1 = movie;
            movie1.gallery = `${constants.BASE_URL_POSTER}${movie.imdbID}/videogallery`;
          });

          const ratingResponse = await Promise.all(ratingArr);
          moviesData.Search.forEach((movie, pos) => {
            const movie1 = movie;
            movie1.rating = ratingResponse[pos];
          });

          this.renderResponse(moviesData);
        }
      } else {
        this.constructor.showInfo('.error-noerror', constants.REQUEST_LIMIT,
          'error');
      }
    } catch (err) {
      this.constructor.showInfo('.error-noerror', constants.CONNECTION_LOST, 'error');
    }
    loader.classList.toggle('visible');
    this.firstRender = false;
  }
}
