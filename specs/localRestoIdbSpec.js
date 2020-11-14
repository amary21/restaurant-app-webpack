import { itActsAsLocalRestaurantModel } from './contract/localRestoContract';
import LocalData from '../src/scripts/data/local-data';

describe('Favorite Resto Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await LocalData.getAllRestaurants()).forEach(async (restaurant) => {
            await LocalData.deleteRestaurant(restaurant.id);
        });
    });

    itActsAsLocalRestaurantModel(LocalData);
});