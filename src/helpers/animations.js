const animate = (scene) => {
  scene.anims.create({
    key: 'move',
    frames: scene.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
    frameRate: 2,
    repeat: -1,
  });

  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('hero', { start: 4, end: 5 }),
    frameRate: 2,
    repeat: -1,
  });

  scene.anims.create({
    key: 'burn',
    frames: scene.anims.generateFrameNumbers('flame', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'rotate',
    frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
    frameRate: 10,
    yoyo: true,
    repeat: -1,
  });
};

export default animate;