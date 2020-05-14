export class Slide {
  constructor({
    Title, Poster, Year, rating, gallery,
  }) {
    this.title = Title;
    this.link = gallery;
    this.imgSrc = Poster;
    this.year = Year;
    this.rating = rating;
  }

  preloadImg() {
    const slideImg = new Image();
    slideImg.classList.add('swiper-slide__img');
    slideImg.src = this.imgSrc;
    slideImg.alt = 'Movie poster';
    return new Promise((resolve) => { //wo prom
      slideImg.onload = function () {
        resolve(slideImg);
      };
      slideImg.onerror = function () {
        slideImg.src = './assets/img/no-img.jpg';
        resolve(slideImg);
      };
    });
  }

  createMarkup() {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const slideLink = document.createElement('a');
    slideLink.classList.add('swiper-slide__link');
    slideLink.href = this.link;
    slideLink.target = '_blank';

    const slideTitle = document.createElement('h3');
    slideTitle.classList.add('swiper-slide__title');
    slideTitle.innerHTML = this.title;

    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.classList.add('swiper-slide__tooltip-wrapper');

    const tooltip = document.createElement('span');
    tooltip.classList.add('swiper-slide__tooltip');
    tooltip.innerHTML = this.title;

    const slideYear = document.createElement('div');
    slideYear.classList.add('swiper-slide__year');
    slideYear.innerHTML = this.year;

    const slideRating = document.createElement('div');
    slideRating.classList.add('swiper-slide__rating');
    slideRating.innerHTML = this.rating;

    const slideStar = document.createElement('img');
    slideStar.classList.add('swiper-slide__star');
    slideStar.src = './src/assets/img/star.svg';
    slideStar.alt = 'Star';

    tooltipWrapper.append(tooltip);
    slideTitle.append(tooltipWrapper);

    slideLink.append(slideTitle);
    slide.append(slideLink);
    this.preloadImg()
      .then((img) => {
        slide.append(img);
        slide.append(slideYear);
        slideRating.append(slideStar);
        slide.append(slideRating);
      });


    return slide;
  }
}
