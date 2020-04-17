export class CategoryCard {
  constructor(catName, image) {
    this.category = catName;
    this.image = image;
  }
  generate() {
    const cardsContainer = document.querySelector('.cards-container');
    let content = '';
    content += `
           <a href="#" class="category-card">
             <div class="category-card__img" style="background-image: url(../assets/${this.image}"></div>
             <div class="category-card__name">${this.category}</div>
           </a>`;
    cardsContainer.innerHTML += content;
  }
}
