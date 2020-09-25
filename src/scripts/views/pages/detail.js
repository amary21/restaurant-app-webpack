import '../templates/components/view-bar';
import '../templates/components/detail';
import UrlParser from '../../routes/url-parser';
import RemoteData from '../../data/remote-data';
import NavbarListener from '../../utils/navbar-listener';

const Detail = {
  async render() {
    return `
    <view-bar></view-bar>
    <section class="content">
      <detail-content></detail-content>
    </section>`;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RemoteData.detailRestaurant(url.id);
    const urlImage = process.env.BASE_URL_IMAGE + restaurant.pictureId;

    const jumbotron = document.querySelector('.hero');
    jumbotron.style.backgroundImage = `url("${urlImage}")`;

    const tagLine = document.querySelector('.hero__tagline');
    const title = document.querySelector('.hero__title');
    tagLine.innerHTML = restaurant.city;
    title.innerHTML = restaurant.name;

    const nav = document.querySelector('nav');
    NavbarListener.init({
      navbar: nav,
    });

    const detailContent = document.querySelector('detail-content');
    detailContent.dataRestaurant = restaurant;
  },
};

export default Detail;
