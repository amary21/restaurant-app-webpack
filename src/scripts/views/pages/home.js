import '../components/view-bar';
import '../components/resto-list';
import RemoteData from '../../data/remote-data';
import NavbarListener from '../../utils/navbar-listener';

const Home = {
  async render() {
    return `
      <view-bar></view-bar>
      <section class="content" id="maincontent">
          <div class="explore">
              <h2 class="explore__label">Explore Restaurant</h2>
              <div class="loader"></div>
              <resto-list></resto-list>
              <div id="not-found">
                <div class="img__not-found"></div>
                <h3 class="text__not-found">data is not available, please check your connection</h3>
              </div>
          </div>
      </section>`;
  },

  async afterRender() {
    const jumbotron = document.querySelector('.hero');
    jumbotron.classList.add('hero__home');

    const nav = document.querySelector('nav');
    NavbarListener.init({
      navbar: nav,
    });

    const listElement = document.querySelector('resto-list');
    const notFoundElement = document.querySelector('#not-found');
    const loadBar = document.querySelector('.loader');
    const listRestaurant = await RemoteData.listRestaurants();
    loadBar.style.display = 'none';
    if (listRestaurant !== null) {
      listElement.dataRestaurants = listRestaurant;
      notFoundElement.style.display = 'none';
    } else {
      notFoundElement.style.display = 'block';
    }
  },
};

export default Home;
