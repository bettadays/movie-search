class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const removeIndex = this.observers.findIndex((obs) => observer === obs);

    if (removeIndex !== -1) {
      this.observers.splice(removeIndex, 1);
    }
  }

  notify(state) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => {
        observer.update(state);
      });
    }
  }
}

export default Subject;
