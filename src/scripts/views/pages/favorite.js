import '../components/resto-list';
import LocalData from '../../data/local-data';

const Favorite = {
  async render() {
    return `
      <section class="content">
          <div class="explore favorite__explore">
            <h2 class="explore__label">Explore Your Favorite Restaurant</h2>
            <resto-list></resto-list>
          </div>
      </section>`;
  },

  async afterRender() {
    const nav = document.querySelector('nav');
    nav.style.backgroundColor = '#005792';

    const drawer = document.querySelector('nav ul');
    drawer.classList.remove('slide');

    const listElement = document.querySelector('resto-list');
    const listRestaurant = await LocalData.getAllRestaurants();
    listElement.dataRestaurants = listRestaurant;
  },
};

export default Favorite;
