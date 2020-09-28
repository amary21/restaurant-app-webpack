import * as urlImageFood from '../../../public/images/menu-food.jpg';
import * as urlImageDrink from '../../../public/images/menu-drink.jpg';

class Menu extends HTMLElement {
  set dataMenus(menu) {
    this.menus = menu;
    this.render();
  }

  render() {
    let foodItem = '';
    this.menus.foods.forEach((food) => {
      foodItem += `<li>${food.name}</li>`;
    });

    let drinkItem = '';
    this.menus.drinks.forEach((drink) => {
      drinkItem += `<li>${drink.name}</li>`;
    });

    this.innerHTML = `
      <div class="menu__item">
        <div class="menu__title" style="background-image: url('${urlImageFood.default}');">
          <div class="menu__effect">
            <h5>Food</h5>
          </div>
        </div>
        <ul>
          ${foodItem}
        </ul>
      </div>
      <div class="menu__item">
        <div class="menu__title" style="background-image: url('${urlImageDrink.default}');">
          <div class="menu__effect">
            <h5>Drink</h5>
          </div>
        </div>
        <ul>
          ${drinkItem}
        </ul>
      </div>
    `;
  }
}

customElements.define('menu-list', Menu);
