import { openDB } from 'idb';

const dbPromise = openDB(process.env.DATABASE_NAME, process.env.DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(process.env.OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const LocalData = {
  async getRestaurant(id) {
    return (await dbPromise).get(process.env.OBJECT_STORE_NAME, id);
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(process.env.OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    return (await dbPromise).put(process.env.OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(process.env.OBJECT_STORE_NAME, id);
  },
};

export default LocalData;
