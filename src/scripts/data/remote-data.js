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

  static async addReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(review),
    };
    const response = await fetch(`${process.env.BASE_URL}/review`, options);
    const responseJson = await response.json();
    console.log(responseJson.message);
    window.location.reload();
  }
}

export default RemoteData;
