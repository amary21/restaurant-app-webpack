class RemoteData {
  static async listRestaurants() {
    const response = await fetch(`${process.env.BASE_URL}list`);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(`${process.env.BASE_URL}detail/${id}`);
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default RemoteData;
