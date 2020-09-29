class RemoteData {
  static async listRestaurants() {
    const response = await fetch(`${process.env.BASE_URL}list`);
    if (response.status !== 404) {
      const responseJson = await response.json();
      return responseJson.restaurants;
    }
    return null;
  }

  static async detailRestaurant(id) {
    const response = await fetch(`${process.env.BASE_URL}detail/${id}`);
    if (response.status !== 404) {
      const responseJson = await response.json();
      return responseJson.restaurant;
    }
    return null;
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
