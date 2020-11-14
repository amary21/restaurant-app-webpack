import { openDB } from 'idb';

const dbPromise = openDB(process.env.DATABASE_NAME, process.env.DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(process.env.OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const LocalData = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(process.env.OBJECT_STORE_NAME, id);
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(process.env.OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(process.env.OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(process.env.OBJECT_STORE_NAME, id);
  },

  async searchRestaurants(query) {
    return (await this.getAllRestaurants()).filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
   
      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
   
      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};

export default LocalData;
