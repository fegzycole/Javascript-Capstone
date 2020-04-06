const enemiesGenerator = (() => {
  const generateMace = () => {
    const maces = [];

    const arrayOfHeights = [0, 100, 270, 400];
    const yCoordinate = arrayOfHeights[Math.floor(Math.random() * 4)];

    for (let i = 200; i < 10000; i += 500) {
      maces.push({ x: i, y: yCoordinate });
    }

    for (let i = 10000; i < 20000; i += 550) {
      maces.push({ x: i, y: yCoordinate });
    }

    for (let i = 20000; i < 30000; i += 500) {
      maces.push({ x: i, y: yCoordinate });
    }

    for (let i = 30000; i < 40000; i += 400) {
      maces.push({ x: i, y: yCoordinate });
    }

    for (let i = 40000; i < 50000; i += 200) {
      maces.push({ x: i, y: yCoordinate });
    }

    return maces;
  };

  const generateFire = () => {
    const fireCoordinates = [];

    const arrayOfHeights = [0, 100, 270, 400];
    const yCoordinate = arrayOfHeights[Math.floor(Math.random() * 4)];

    for (let i = 700; i < 10000; i += 800) {
      fireCoordinates.push({ x: i, y: yCoordinate });
    }

    for (let i = 10700; i < 20000; i += 600) {
      fireCoordinates.push({ x: i, y: yCoordinate });
    }

    for (let i = 20700; i < 30000; i += 500) {
      fireCoordinates.push({ x: i, y: yCoordinate });
    }

    for (let i = 30700; i < 40000; i += 400) {
      fireCoordinates.push({ x: i, y: yCoordinate });
    }

    for (let i = 40000; i < 50000; i += 200) {
      fireCoordinates.push({ x: i, y: yCoordinate });
    }

    return fireCoordinates;
  };

  return {
    generateMace,
    generateFire,
  };
})();

export default enemiesGenerator;
