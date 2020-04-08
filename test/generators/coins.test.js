import coinCordinates from '../../src/generators/coins';


test('should return an array of coordinates for the coins', () => {
  expect(typeof coinCordinates[0]).toBe('object');
  expect(Object.keys(coinCordinates[0])).toEqual(['x', 'y']);
});
