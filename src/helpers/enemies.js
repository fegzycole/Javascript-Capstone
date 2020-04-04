const enemiesGenerator = (() => {
  const generateMace = () => {
    const maces = [];

    const arrayOfHeights = [100, 300, 470];
    const yCoordinate = arrayOfHeights[Math.floor(Math.random() * 3)];

    for (let i = 200; i < 10000; i += 700) {
      maces.push({ x: i, y: yCoordinate });
    }

    for (let i = 10000; i < 20000; i += 600) {
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

  return {
    generateMace,
  };
})();

export default enemiesGenerator;
