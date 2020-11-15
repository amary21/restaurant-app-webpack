class LocalRestaurantShowPresenter {
    constructor({ view, favoriteRestaurant }) {
        this._view = view;
        this._favoriteRestaurant = favoriteRestaurant;

        this._showFavoriteRestaurants();
      }

      async _showFavoriteRestaurants(){
        const restaurants = this._favoriteRestaurant.getAllRestaurants();
        this._displayRestaurants(restaurants);
      }
     
      _displayRestaurants(restaurants) {
        this._view.showFavoriteRestaurant(restaurants);
      }
}

export default LocalRestaurantShowPresenter;