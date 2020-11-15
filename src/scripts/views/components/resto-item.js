import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class RestoItem extends HTMLElement {
  set restaurant(data) {
    this.dataRestaurant = data;
    this.render();
  }

  render() {
    this.innerHTML = `<article class="post-item">
        <a href="${`/#/detail/${this.dataRestaurant.id}`}">
          <img class="post-item__thumbnail lazyload" data-src="${process.env.BASE_URL_IMAGE + this.dataRestaurant.pictureId}" alt="${this.dataRestaurant.name}">
          <div class="post-item__content">
              <h2 class="post-item__name">${this.dataRestaurant.name} (${this.dataRestaurant.city})</h2>
              <h3 class="post-item__rate">${this.dataRestaurant.rating}</h3>
              <p class="post-item__description">${this.dataRestaurant.description}</p>
          </div>
        </a>    
      </article>`;
  }
}

customElements.define('resto-item', RestoItem);
