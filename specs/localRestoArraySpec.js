import { itActsAsLocalRestaurantModel } from './contract/localRestoContract';
 
let localRestaurants = [];
 
const LocalRestaurantArray = {
 
  getRestaurant(id) {
    if (!id) {
      return;
    }
 
    return localRestaurants.find((restaurant) => restaurant.id == id);
  },
 
  getAllRestaurants() {
    return localRestaurants;
  },
 
  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
 
    if (this.getRestaurant(restaurant.id)) {
      return;
    }
 
    localRestaurants.push(restaurant);
  },
 
  deleteRestaurant(id) {
    localRestaurants = localRestaurants.filter((restaurant) => restaurant.id != id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurants()
      .filter((restaurant) => {
        const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
        const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantName.indexOf(jammedQuery) !== -1;
      });
  },
};
 
describe('Favorite restaurant Array Contract Test Implementation', () => {
  afterEach(() => localRestaurants = []);
 
  itActsAsLocalRestaurantModel(LocalRestaurantArray);
});