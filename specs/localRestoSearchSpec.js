import LocalRestaurantSearchPresenter from "../src/scripts/views/pages/liked-restaurants/local-restaurant-search-presenter";
import LocalRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/local-restaurant-search-view';
import LocalData from "../src/scripts/data/local-data";


describe("Searching restaurants", () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById("query");
    queryElement.value = query;
    queryElement.dispatchEvent(new Event("change"));
  };

  const setRestaurantsContainer = () => {
    view = new LocalRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(LocalData);
    presenter = new LocalRestaurantSearchPresenter({
      favoriteRestaurants,
      view
    });
  };

  beforeEach(() => {
    setRestaurantsContainer();
    constructPresenter();
  });

  describe("When query is not empty", () => {
    it("should be able to capture the query typed by the user", () => {
      searchRestaurants("restoran a");

      expect(presenter.latestQuery).toEqual("restoran a");
    });

    it("should ask the model to search for liked restaurants", () => {
      searchRestaurants("restoran a");

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith(
        "restoran a"
      );
    });

    it("should show the name of the found restaurants", () => {
      presenter._showFoundRestaurants([
        {
          id: 1,
          name: "Satu",
        },
      ]);
      expect(
        document.querySelectorAll(".restaurant__name").item(0).textContent
      ).toEqual("Satu");
    });

    it("should show the name of the found restaurants", () => {
      presenter._showFoundRestaurants([
        {
          id: 1,
          name: "Satu",
        },
      ]);
      expect(
        document.querySelectorAll(".restaurant__name").item(0).textContent
      ).toEqual("Satu");

      presenter._showFoundRestaurants([
        {
          id: 1,
          name: "Satu",
        },
        {
          id: 2,
          name: "Dua",
        },
      ]);

      const restaurantNames = document.querySelectorAll(".restaurant__name");
      expect(restaurantNames.item(0).textContent).toEqual("Satu");
      expect(restaurantNames.item(1).textContent).toEqual("Dua");
    });

    it("should show - for found movie without name", () => {
      presenter._showFoundRestaurants([
        {
          id: 1,
        },
      ]);

      expect(
        document.querySelectorAll(".restaurant__name").item(0).textContent
      ).toEqual("-");
    });

    it("should show the restaurants found by Favorite Restaurants", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          expect(document.querySelectorAll(".restaurant").length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs("restoran a")
        .and.returnValues([
          {
            id: 111,
            name: "restoran abc",
          },
          {
            id: 222,
            name: "ada juga restoran abcde",
          },
          {
            id: 333,
            name: "ini juga boleh restoran a",
          },
        ]);

      searchRestaurants("restoran a");
    });

    it("should show the name of the restauranst found by Favorite Restauranst", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          const restaurantNames = document.querySelectorAll(
            ".restaurant__name"
          );
          expect(restaurantNames.item(0).textContent).toEqual("restoran abc");
          expect(restaurantNames.item(1).textContent).toEqual(
            "ada juga restoran abcde"
          );
          expect(restaurantNames.item(2).textContent).toEqual(
            "ini juga boleh restoran a"
          );

          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs("restoran a")
        .and.returnValues([
          {
            id: 111,
            name: "restoran abc",
          },
          {
            id: 222,
            name: "ada juga restoran abcde",
          },
          {
            id: 333,
            name: "ini juga boleh restoran a",
          },
        ]);

      searchRestaurants("restoran a");
    });
  });

  describe("When query is empty", () => {
    it("should capture the query as empty", () => {
      searchRestaurants(" ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants(" ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants("    ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants("");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants("\t");
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it("should show all favorite restaurant", () => {
      searchRestaurants("    ");

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe("When no favorite restaurants could be found", () => {
    it("should show the empty message", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          expect(
            document.querySelectorAll(".restaurants__not__found").length
          ).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs("restoran a")
        .and.returnValues([]);

      searchRestaurants("restoran a");
    });

    it("should not show any restaurant", (done) => {
      document
        .getElementById("restaurant-search-container")
        .addEventListener("restaurants:searched:updated", () => {
          expect(document.querySelectorAll(".restaurant").length).toEqual(0);
          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs("restoran a")
        .and.returnValues([]);

      searchRestaurants("restoran a");
    });
  });
});
