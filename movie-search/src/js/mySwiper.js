import Swiper from 'swiper';

export const mySwiper = new Swiper('.swiper-container', {
  loop: false,
  init: false,
  slidesPerView: 1,
  initialSlide: 0,
  centerInsufficientSlides: true,
  watchOverflow: true,
  observer: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    678: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },

});
