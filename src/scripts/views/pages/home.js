import '../components/view-bar';
import '../components/resto-list';
import * as urlImage from '../../../public/images/hero-image_4.jpg';
import RemoteData from '../../data/remote-data';
import NavbarListener from '../../utils/navbar-listener';

const Home = {
  async render() {
    return `
      <view-bar></view-bar>
      <section class="content" id="maincontent">
          <div class="explore">
              <h2 class="explore__label">Explore Restaurant</h2>
              <resto-list></resto-list>
          </div>
      </section>`;
  },

  async afterRender() {
    const jumbotron = document.querySelector('.hero');
    jumbotron.style.backgroundImage = `url("${urlImage.default}")`;

    const nav = document.querySelector('nav');
    NavbarListener.init({
      navbar: nav,
    });

    const listElement = document.querySelector('resto-list');
    const listRestaurant = await RemoteData.listRestaurants();
    listElement.dataRestaurants = listRestaurant;
  },
};

export default Home;
