import {WordCard} from './WordCard.js';


export class WordsList {
  constructor(data, category, mode) {
    this.category = category;
    this.data = data;
    this.mode = mode;
  }
  generate() {
    this.data.forEach(item => {
      if (item.catName === this.category) {
        item.data.forEach(item => {
          const wordCard = new WordCard(item, this.mode);
          wordCard.generate();
        })
      }
    })
  }
}
