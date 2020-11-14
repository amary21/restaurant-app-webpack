import LocalData from '../data/local-data';
import { createLikeRestoButtonTemplate, createUnlikeRestoButtonTemplate } from '../views/templates/tempate-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, snackBar, restaurant }) {
    this.likeButtonContainer = likeButtonContainer;
    this.snackBar = snackBar;
    this.restaurant = restaurant;

    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.restaurant;

    if (await this.isRestaurantExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isRestaurantExist(id) {
    const restaurant = await LocalData.getRestaurant(id);
    return !!restaurant;
  },

  renderLike() {
    this.likeButtonContainer.innerHTML = createLikeRestoButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await LocalData.putRestaurant(this.restaurant);
      await this.renderButton();
      this.showSnackBar('The Restaurant has been added');
    });
  },

  renderLiked() {
    this.likeButtonContainer.innerHTML = createUnlikeRestoButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await LocalData.deleteRestaurant(this.restaurant.id);
      await this.renderButton();
      this.showSnackBar('The Restaurant has been deleted');
    });
  },

  showSnackBar(message) {
    const TIME_TO_OFF = 3000;
    this.snackBar.innerHTML = message;
    this.snackBar.className = 'show';
    setTimeout(() => {
      this.snackBar.className = this.snackBar.className.replace('show', '');
    }, TIME_TO_OFF);
  },
};

export default LikeButtonPresenter;
