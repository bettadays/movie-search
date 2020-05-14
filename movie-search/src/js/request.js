import { mySwiper } from './mySwiper';
import { Slide } from './Slide';

export const state = {
  currentPage: 1,
  movieRequest: 'dream',
  loadMore: false,
  controller: {},
  controllerSignal: {},
  triggerLoadMoreSlides: 5,
  currentIndex: 0,
};

export const createController = () => {
  const controller = new AbortController();
  state.controller = controller;
  state.controllerSignal = controller.signal;
};

const createRequest = (movie, mode) => {
  const apiKeyImdb = 'db40933d';
  const requestMode = (mode === 'search' ? 's' : 'i');
  const encodedMovieTitle = encodeURI(movie);
  const url = `https://www.omdbapi.com/?apikey=${apiKeyImdb}&${requestMode}=${encodedMovieTitle}&page=${state.currentPage}&type=movie`;
  return url;
};


async function translateRUtoEN(request) {
  try {
    const apiKeyYandex = 'trnsl.1.1.20200507T084733Z.d29d276f95af1481.d6d61214e6ae761cf99f7225b5b4823448d5ddd8';
    const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeyYandex}&text=${request}&lang=ru-en`);

    if (response.ok) {
      const translation = await response.json();
      state.movieRequest = translation.text[0];
      return translation.text[0];
    }
  } catch (err) {
    const error = document.querySelector('.error-noerror');
    error.style.color = 'red';
    error.innerHTML = `Sorry! ${err}`;
  }
  return response;
}


export async function getMovies(userInput) {
  const loader = document.querySelector('.loader');
  const totalFilmsFound = document.querySelector('.total-results');
  const error = document.querySelector('.error-noerror');

  const isCyrillic = /[а-я]/ig.test(userInput);
  if (isCyrillic) {
    userInput = await translateRUtoEN(userInput);
  }

  try {
    loader.classList.toggle('visible');
    const response = await fetch(createRequest(userInput, 'search'), state.controllerSignal);

    if (response.ok) {
      const moviesData = await response.json();
      if (moviesData.Response === 'False') {
        const errorMessage = moviesData.Error;
        error.style.color = 'red';
        if (moviesData.Error === 'Movie not found!') {
          error.innerHTML = `Sorry! No results found for '${state.movieRequest}'`;
        } else if (response.status === 401) {
          error.innerHTML = `Sorry! ${errorMessage}`;
        }
      }
      const ratingArr = [];
      if (moviesData.Search) {
        for (const movie of moviesData.Search) {
          ratingArr.push(getRating(movie.imdbID));
          movie.gallery = `https://www.imdb.com/title/${movie.imdbID}/videogallery`;
        }


        const ratingResponse = await Promise.all(ratingArr);
        moviesData.Search.forEach((movie, pos) => {
          movie.rating = ratingResponse[pos];
        });

        if (!state.loadMore) {
          mySwiper.removeAllSlides();

        }

        const slides = [];
        moviesData.Search.forEach((movie) => {
          const slide = new Slide(movie);
          slides.push(slide.createMarkup());
        });
        mySwiper.appendSlide(slides);
        mySwiper.slideTo(state.currentIndex);


        error.innerHTML = `Showing results for '${state.movieRequest}'`;
        error.style.color = 'blue';

        totalFilmsFound.innerHTML = `${moviesData.totalResults} movies were found`;
      }
    }
    else {
      error.innerHTML = 'Sorry! Request limit reached';
      error.style.color = 'red';
    }
  } catch (err) {
    error.innerHTML = `Sorry! ${err}`;
    error.style.color = 'red';
  }

  loader.classList.toggle('visible');
}

async function getRating(movieID) {
  try {
    const response = await fetch(createRequest(movieID, 'byMovie'), state.controllerSignal);
    if (response.ok) {
      const movieData = await response.json();
      return movieData.imdbRating;
    }
  } catch (err) {
    error.innerHTML = `Sorry! ${err}`;
    error.style.color = 'red';
  }
}
