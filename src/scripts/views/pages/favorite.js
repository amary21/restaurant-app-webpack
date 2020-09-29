import '../components/resto-list';
import LocalData from '../../data/local-data';
import * as urlImage from '../../../public/images/hero-image_6.jpg';
import NavbarListener from '../../utils/navbar-listener';

const Favorite = {
  async render() {
    return `
      <view-bar></view-bar>
      <section class="content">
          <div class="explore">
            <h2 class="explore__label">Explore Your Favorite Restaurant</h2>
            <resto-list></resto-list>
            <div id="not-found">
              <div class="img__not-found"></div>
              <h3 class="text__not-found">data is empty</h3>
            </div>
          </div>
      </section>`;
  },

  async afterRender() {
    const jumbotron = document.querySelector('.hero');
    jumbotron.style.backgroundImage = `url("${urlImage.default}")`;

    const tagLine = document.querySelector('.hero__tagline');
    const title = document.querySelector('.hero__title');
    tagLine.innerHTML = '';
    title.innerHTML = 'Favorite Restaurant';

    const nav = document.querySelector('nav');
    NavbarListener.init({
      navbar: nav,
    });

    const listElement = document.querySelector('resto-list');
    const notFoundElement = document.querySelector('#not-found');
    const listRestaurant = await LocalData.getAllRestaurants();
    if (listRestaurant.length > 0) {
      listElement.dataRestaurants = listRestaurant;
      notFoundElement.style.display = 'none';
    } else {
      notFoundElement.style.display = 'block';
    }
  },
};

export default Favorite;
