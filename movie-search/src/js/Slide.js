import create from './utils/create';

export default class Slide {
  constructor({
    Title,
    Poster,
    Year,
    rating,
    gallery,
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
    return new Promise((resolve) => {
      slideImg.onload = () => {
        resolve(slideImg);
      };
      slideImg.onerror = () => {
        slideImg.src = './assets/img/no-img.jpg';
        resolve(slideImg);
      };
    });
  }

  createMarkup() {
    const slide = create('div', ['swiper-slide']);
    const slideLink = create('a', ['swiper-slide__link'], { href: this.link, target: '_blank' }, null, slide);
    const slideTitle = create('h3', ['swiper-slide__title'], null, this.title, slideLink);
    const tooltipWrapper = create('div', ['swiper-slide__tooltip-wrapper'], null, null, slideTitle);


     /* eslint-disable-line */ const tooltip = create('span', ['swiper-slide__tooltip'], null, this.title, tooltipWrapper);
    const slideYear = create('div', ['swiper-slide__year'], null, this.year);
    const slideRating = create('div', ['swiper-slide__rating'], null, this.rating);
    const slideStar = create('img', ['swiper-slide__star'], { src: './src/assets/img/star.svg', alt: 'Star' });
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
