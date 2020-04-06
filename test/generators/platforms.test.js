import platformCoordinates from '../../src/generators/platforms';

test('should return an array of coordinates for the platforms', () => {
  expect(typeof platformCoordinates[0]).toBe('object');
  expect(Object.keys(platformCoordinates[0])).toEqual(['x', 'y']);
});