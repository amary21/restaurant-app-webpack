const itActsAsLocalRestaurantModel = (localRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    localRestaurant.putRestaurant({ id: 1 });
    localRestaurant.putRestaurant({ id: 2 });
 
    expect(await localRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await localRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await localRestaurant.getRestaurant(3)).toEqual(undefined);
  });
 
  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    localRestaurant.putRestaurant({ aProperty: 'property' });
 
    expect(await localRestaurant.getAllRestaurants())
      .toEqual([]);
  });
 
  it('can return all of the restaurant that have been added', async () => {
    localRestaurant.putRestaurant({ id: 1 });
    localRestaurant.putRestaurant({ id: 2 });
 
    expect(await localRestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });
 
  it('should remove favorite restaurant', async () => {
    localRestaurant.putRestaurant({ id: 1 });
    localRestaurant.putRestaurant({ id: 2 });
    localRestaurant.putRestaurant({ id: 3 });
 
    await localRestaurant.deleteRestaurant(1);
 
    expect(await localRestaurant.getAllRestaurants())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });
 
  it('should handle request to remove a restaurant even though the rstaurant has not been added', async () => {
    localRestaurant.putRestaurant({ id: 1 });
    localRestaurant.putRestaurant({ id: 2 });
    localRestaurant.putRestaurant({ id: 3 });
 
    await localRestaurant.deleteRestaurant(4);
 
    expect(await localRestaurant.getAllRestaurants())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for restaurant', async () => {
    localRestaurant.putRestaurant({ id: 1, name: 'restoran a' });
    localRestaurant.putRestaurant({ id: 2, name: 'restoran b' });
    localRestaurant.putRestaurant({ id: 3, name: 'restoran abc' });
    localRestaurant.putRestaurant({ id: 4, name: 'ini mah restoran abcd' });
   
    expect(await localRestaurant.searchRestaurants('restoran a')).toEqual([
      { id: 1, name: 'restoran a' },
      { id: 3, name: 'restoran abc' },
      { id: 4, name: 'ini mah restoran abcd' },
    ]);
  });
};
 
export { itActsAsLocalRestaurantModel };