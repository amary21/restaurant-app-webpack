import './resto-item';

class RestoList extends HTMLElement {
  set dataRestaurants(listData) {
    this.restaurants = listData;
    this.render();
  }

  render() {
    this.classList.add('posts');
    this.innerHTML = '';
    this.restaurants.forEach((restaurant) => {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.restaurant = restaurant;
      this.appendChild(restoItemElement);
    });
  }
}

customElements.define('resto-list', RestoList);
