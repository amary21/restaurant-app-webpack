import '../components/view-bar';
import '../components/detail';
import '../components/review';
import '../components/add-review';
import UrlParser from '../../routes/url-parser';
import RemoteData from '../../data/remote-data';
import NavbarListener from '../../utils/navbar-listener';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
    <view-bar></view-bar>
    <section class="content">
      <div class="loader"></div>
      <detail-content></detail-content>
      <h4 class="explore__label">Review</h4>
      <add-review class="form"></add-review>
      <review-bar></review-bar>
      <div id="likeButtonContainer"></div>
      <div id="snackbar"></div>
    </section>`;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const nav = document.querySelector('nav');

    const buttonAdd = document.querySelector('#buttonAdd');
    const inputName = document.querySelector('#inputName');
    const inputReview = document.querySelector('#inputReview');
    buttonAdd.addEventListener('click', () => {
      const review = {
        id: url.id,
        name: inputName.value,
        review: inputReview.value,
      };
      this.insertReview(review);
    });

    await this.getDetail(url, nav);
  },

  async insertReview(review) {
    await RemoteData.addReview(review);
  },

  async getDetail(url, nav) {
    const restaurant = await RemoteData.detailRestaurant(url.id);
    if (restaurant !== null) {
      NavbarListener.init({
        navbar: nav,
      });

      const urlImage = process.env.BASE_URL_IMAGE + restaurant.pictureId;
      const jumbotron = document.querySelector('.hero');
      jumbotron.style.backgroundImage = `url("${urlImage}")`;

      const tagLine = document.querySelector('.hero__tagline');
      const title = document.querySelector('.hero__title');
      tagLine.innerHTML = restaurant.city;
      title.innerHTML = restaurant.name;

      const detailContent = document.querySelector('detail-content');
      detailContent.dataRestaurant = restaurant;

      const reviewElement = document.querySelector('review-bar');
      reviewElement.dataReviews = restaurant.consumerReviews;

      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        snackBar: document.querySelector('#snackbar'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });
    } else {
      nav.classList.remove('nav-transparent');
      nav.classList.add('nav-colored');

      const section = document.querySelector('section');
      section.innerHTML = `<div id="not-found">
          <div class="img__not-found"></div>
          <h3 class="text__not-found">data is not available, please check your connection</h3>
        </div>`;

      const viewBar = document.querySelector('view-bar');
      viewBar.style.display = 'none';

      const notFoundElement = document.querySelector('#not-found');
      notFoundElement.style.display = 'block';

      const footer = document.querySelector('footer');
      footer.style.display = 'none';
    }
  },
};

export default Detail;
