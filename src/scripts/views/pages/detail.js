import '../templates/components/view-bar';
import '../templates/components/detail';
import '../templates/components/review';
import UrlParser from '../../routes/url-parser';
import RemoteData from '../../data/remote-data';
import NavbarListener from '../../utils/navbar-listener';

const Detail = {
  async render() {
    return `
    <view-bar></view-bar>
    <section class="content">
      <detail-content></detail-content>
      <h4 class="explore__label">Review</h4>
      <div class="form">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input id="inputName" type="text" class="form-control" placeholder="Input Your Name">
        </div>
        <div class="form-group">
            <label for="inputReview">Review</label>
            <input id="inputReview" type="text" class="form-control" placeholder="Your Review">
        </div>
        <div class="form-group">
          <button id="buttonAdd" class="btn btn-success">Add</button>
        </div>
      </div>
      <review-bar></review-bar>
    </section>`;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const nav = document.querySelector('nav');
    NavbarListener.init({
      navbar: nav,
    });

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

    this.getDetail(url);
  },

  async insertReview(review) {
    await RemoteData.addReview(review);
  },

  async getDetail(url) {
    const restaurant = await RemoteData.detailRestaurant(url.id);
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
  },
};

export default Detail;
