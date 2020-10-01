import './menu';
import './review';

class Detail extends HTMLElement {
  set dataRestaurant(data) {
    this.restaurant = data;
    this.render();
  }

  render() {
    const categories = this.restaurant.categories.map((item) => item.name);
    this.innerHTML = `
        <h4 class="explore__label">Overview</h4>
        <h5 class="detail__label">Address</h4>
        <p class="detail__content">${this.restaurant.address}</p>
        <h5 class="detail__label">Rating</h4>
        <p class="detail__content">${this.restaurant.rating}</p>
        <h5 class="detail__label">Categories</h4>
        <p class="detail__content">${categories.join(', ')}</p>
        <h5 class="detail__label">Description</h4>
        <p class="detail__content">${this.restaurant.description}</p>
        <h4 class="explore__label">Menu</h4>
        <menu-list></menu-list>
        `;

    const menuElement = document.querySelector('menu-list');
    menuElement.dataMenus = this.restaurant.menus;
  }
}

customElements.define('detail-content', Detail);
