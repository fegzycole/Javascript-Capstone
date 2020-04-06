import enemiesGenerator from '../../src/generators/enemies';

test('should return an array of co-ordinates for the mace objects', () => {
  expect(typeof enemiesGenerator.generateMace()).toBe('object');
  expect(Object.keys(enemiesGenerator.generateMace()[0])).toEqual(['x', 'y']);
});

test('should return an array of co-ordinates for the fire objects', () => {
  expect(typeof enemiesGenerator.generateFire()).toBe('object');
  expect(Object.keys(enemiesGenerator.generateFire()[0])).toEqual(['x', 'y']);
});