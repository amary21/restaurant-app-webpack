class LocalRestaurantSearchView {
  getTemplate() {
    return `
        <div class="content">
          <input id="query" type="text">
          <h2 class="content__heading">Your Liked Restaurant</h2>
          <div id="restaurants" class="restaurants"></div>
        </div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById("query").addEventListener("change", (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurant(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(`
        <div class="restaurant-item">
          <h2 class="restaurant__name">${restaurant.name || '-'}</h2>
          <h3 class="restaurant__city">${restaurant.city || '-'}</h3>
          <h3 class="restaurant__rate">${restaurant.rating || '-'}</h3>
          <p class="restaurant__description">${restaurant.description || '-'}</p>
        </div>
      `), '');
    } else {
      html = this._getEmptyRestaurantsTemplate();  
    }

    document.getElementById("restaurants").innerHTML = html;
    document
      .getElementById("restaurants")
      .dispatchEvent(new Event("restaurants:updated"));
  }

  _getEmptyRestaurantsTemplate() {
    return '<div class="restaurant-item__not__found">Restoran tidak ditemukan</div>';
  }
}

export default LocalRestaurantSearchView;
