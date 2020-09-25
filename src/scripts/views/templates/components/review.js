class Review extends HTMLElement {
  set dataReviews(reviews) {
    this.reviews = reviews;
    this.render();
  }

  render() {
    console.log(this.reviews);
    this.reviews.forEach((data) => {
      this.innerHTML += `
        <div class="review__item">
            <h5>${data.name}</h5>
            <h6>${data.date}</h6>
            <p>${data.review}</p>
        </div>`;
    });
  }
}

customElements.define('review-bar', Review);
