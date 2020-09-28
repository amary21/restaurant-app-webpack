class AddReview extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="form-group">
            <label for="inputName">Name</label>
            <input id="inputName" type="text" class="form-control" placeholder="Input Your Name">
        </div>
        <div class="form-group">
            <label for="inputReview">Review</label>
            <input id="inputReview" type="text" class="form-control" placeholder="Your Review">
        </div>
        <div class="form-group">
            <button id="buttonAdd" class="btn btn-success">Add</button>
        </div>`;
  }
}

customElements.define('add-review', AddReview);
