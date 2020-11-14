import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import LocalData from '../../src/scripts/data/local-data';
 
const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    snackBar: document.querySelector('#snackbar'),
    restaurant,
    favoriteRestaurant: LocalData
  });
};
 
export { createLikeButtonPresenterWithRestaurant };