import {CategoryCard} from './CategoryCard.js';

export class CategoriesList {
  constructor(data) {
    this.data = data;
  }
  generate() {
    this.data.forEach((item) => {
    console.log(item.data[0].image)
    const categoryCard = new CategoryCard(item.catName, item.data[0].image);
    categoryCard.generate();
})
  }
}
