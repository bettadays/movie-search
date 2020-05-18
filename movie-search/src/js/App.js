import { mySwiper } from './mySwiper';
import { Slide } from './Slide';
import * as constants from './constants/constants';


export default class App {
  constructor() {
  this.currentPage =  1;
  this.movieRequest = constants.INIT_MOVIE_REQUEST;
  this. loadMore =  false;
  this. controller = {};
  this.controllerSignal = {};
  this.triggerLoadMoreSlides = 5;
  this.currentIndex = 0;
  }


createController() {
  const controller = new AbortController();
  this.controller = controller;
  this.controllerSignal = controller.signal;
};

 createRequest(movie, mode) {
  const apiKeyImdb = constants.API_KEY_OMDB;
  const requestMode = (mode === 'search' ? 's' : 'i');
  const encodedMovieTitle = encodeURI(movie);
  const url = `${constants.BASE_URL_OMDB }${apiKeyImdb}&${requestMode}=${encodedMovieTitle}&page=${this.currentPage}&type=movie`;
  return url;
};

 showInfo(selector, message, type) {
  const error = document.querySelector(`${selector}`);
   if (type === 'error') {
    error.style.color = constants.ERROR_MSG_COLOR;
   } else {
    error.style.color = constants.INFO_MSG_COLOR;
   }
     error.innerHTML = message ;
}


async translateRUtoEN(request) {
  // try {
    const apiKeyYandex = constants.API_KEY_YANDEX;
    const response = await fetch(`${constants.BASE_URL_YANDEX}${apiKeyYandex}&text=${request}&lang=ru-en`);

    if (response.ok) {
      const translation = await response.json();
      this.movieRequest = translation.text[0];
      return translation.text[0];
    }
  // } catch (err) {
  //   this.showInfo('.error-noerror', err, 'error');
  //   // error.innerHTML = `Network problem`;
  // }
  return response;
}


async getRating(movieID) {

  // try {
    const response = await fetch(this.createRequest(movieID, 'byMovie'), this.controllerSignal);
    if (response.ok) {
      const movieData = await response.json();
      return movieData.imdbRating;
    }
  // } catch (err) {
  //   this.showInfo('.error-noerror', err, 'error')
  //   // error.innerHTML = `Network problem`;

  // }
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
          mySwiper.slideTo(mySwiper.previousIndex);

        }

        this.showInfo('.error-noerror',`${constants.RESULTS_FOR} '${this.movieRequest}'`);
        this.showInfo('.total-results', `${response.totalResults} ${constants.MOVIES_FOUND}`);
      }


 async getMovies(userInput) {
  const loader = document.querySelector('.loader');
  const isCyrillic = /[а-яё]/ig.test(userInput);
  if (isCyrillic) {
    userInput = await this.translateRUtoEN(userInput);
  }

  // try {
    loader.classList.toggle('visible');
    const response = await fetch(this.createRequest(userInput, 'search'), this.controllerSignal);

    if (response.ok) {
      const moviesData = await response.json();
      if (moviesData.Response === 'False') {

        let errorMsg = '';
        if (moviesData.Error === 'Movie not found!') {
          errorMsg =`${constants.NO_RESULTS} '${this.movieRequest}'`;
          console.log(this.movieRequest);
        } else {
          errorMsg = `${moviesData.Error}`;
        }

        this.showInfo('.error-noerror', errorMsg, 'error');
      }

      const ratingArr = [];
      if (moviesData.Search) {
        for (const movie of moviesData.Search) {
          ratingArr.push(this.getRating(movie.imdbID));
          movie.gallery = `${constants.BASE_URL_POSTER}${movie.imdbID}/videogallery`;
        }
        const ratingResponse = await Promise.all(ratingArr);
        moviesData.Search.forEach((movie, pos) => {
          movie.rating = ratingResponse[pos];
        });

          this.renderResponse(moviesData);

            }
          } else {
              this.showInfo('.error-noerror', constants.REQUEST_LIMIT
, 'error');
    }
      //}
  // catch (err) {
  //   this.showInfo('.error-noerror', err, 'error')
  //   // error.innerHTML = `Network problem`;
  // }

  loader.classList.toggle('visible');
}

  }





