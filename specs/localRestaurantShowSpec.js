import LocalRestaurantSearchView from "../src/scripts/views/pages/liked-restaurants/local-restaurant-search-view";
import LocalRestaurantShowPresenter from "../src/scripts/views/pages/liked-restaurants/local-restaurant-show-presenter";
import LocalData from "../src/scripts/data/local-data";

describe("Showing all favorite restaurant", () => {
  let view;

  const renderTemplate = () => {
    view = new LocalRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe("When no restaurant have been liked", () => {
    it("should ask for the favorite restaurant", () => {
      const favoriteRestaurant = spyOnAllFunctions(LocalData);

      new LocalRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      expect(favoriteRestaurant.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it("should the information that no restaurant have been liked", (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
     
        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(LocalData);
      favoriteRestaurant.getAllRestaurants.and.returnValues([]);

      new LocalRestaurantShowPresenter({
        view,
        favoriteRestaurant
      })

    });
  });

  describe('When favorite restaurants exist', () => {
    it('should renders the restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(LocalData);
      const presenter = new LocalRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
   
      presenter._displayRestaurants([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah Restaurant A', city: 'Medan',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah Restaurant B', city: 'Bandung',
        },
      ]);
   
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });
  });
});
