const platforms = [
  { x: 50, y: 340 },
];

for (let i = 150; i < 100000; i += 100) {
  const arrayOfHeights = [160, 340, 520];
  const yCoordinate = arrayOfHeights[Math.floor(Math.random() * 3)];

  platforms.push({ x: i, y: yCoordinate });
}

const compare = (a, b) => {
  let comparison = 0;
  if (a > b) {
    comparison = 1;
  } else if (a < b) {
    comparison = -1;
  }
  return comparison;
};

const sortedPlatformCoordinates = platforms.sort(compare);

export default sortedPlatformCoordinates;