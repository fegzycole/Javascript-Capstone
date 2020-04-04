const arrayOfHeights = [0, 100, 280, 450];

const coinCoordinates = [];
const yCoordinate = arrayOfHeights[Math.floor(Math.random() * 4)];

for (let i = 300; i < 10000; i += 700) {
  coinCoordinates.push({ x: i, y: yCoordinate });
  coinCoordinates.push({ x: i + 30, y: yCoordinate });
  coinCoordinates.push({ x: i + 60, y: yCoordinate });
}

for (let i = 10300; i < 20000; i += 600) {
  coinCoordinates.push({ x: i, y: yCoordinate });
  coinCoordinates.push({ x: i + 30, y: yCoordinate });
  coinCoordinates.push({ x: i + 60, y: yCoordinate });
  coinCoordinates.push({ x: i + 90, y: yCoordinate });
}

for (let i = 20300; i < 30000; i += 500) {
  coinCoordinates.push({ x: i, y: yCoordinate });
  coinCoordinates.push({ x: i + 30, y: yCoordinate });
  coinCoordinates.push({ x: i + 60, y: yCoordinate });
  coinCoordinates.push({ x: i + 90, y: yCoordinate });
  coinCoordinates.push({ x: i + 120, y: yCoordinate });
}

for (let i = 30300; i < 40000; i += 400) {
  coinCoordinates.push({ x: i, y: yCoordinate });
  coinCoordinates.push({ x: i + 30, y: yCoordinate });
  coinCoordinates.push({ x: i + 60, y: yCoordinate });
  coinCoordinates.push({ x: i + 90, y: yCoordinate });
  coinCoordinates.push({ x: i + 120, y: yCoordinate });
  coinCoordinates.push({ x: i + 150, y: yCoordinate });
  coinCoordinates.push({ x: i + 180, y: yCoordinate });
}

for (let i = 40300; i < 50000; i += 200) {
  coinCoordinates.push({ x: i, y: yCoordinate });
  coinCoordinates.push({ x: i + 30, y: yCoordinate });
  coinCoordinates.push({ x: i + 60, y: yCoordinate });
  coinCoordinates.push({ x: i + 90, y: yCoordinate });
  coinCoordinates.push({ x: i + 120, y: yCoordinate });
  coinCoordinates.push({ x: i + 150, y: yCoordinate });
  coinCoordinates.push({ x: i + 180, y: yCoordinate });
  coinCoordinates.push({ x: i + 210, y: yCoordinate });
  coinCoordinates.push({ x: i + 240, y: yCoordinate });
}

export default coinCoordinates;
