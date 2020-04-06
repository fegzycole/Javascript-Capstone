const platforms = [
  { x: 50, y: 330 },
];

for (let i = 150; i < 100000; i += 100) {
  const arrayOfHeights = [160, 330, 500];
  const yCoordinate = arrayOfHeights[Math.floor(Math.random() * 3)];

  platforms.push({ x: i, y: yCoordinate });
}

export default platforms;