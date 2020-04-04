/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import 'phaser';
import images from '../helpers/images';
import spriteSheets from '../helpers/spriteSheets';
import platformsArray from '../helpers/platforms';
import gameState from '../state/state';

class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MyScene' });
  }

  preload() {
    images.forEach((image) => {
      this.load.image(image.name, image.path);
    });

    spriteSheets.forEach(({
      name, path, frameHeight, frameWidth,
    }) => {
      this.load.spritesheet(name, path, { frameWidth, frameHeight });
    });
  }

  create() {
    // gameState.bg = this.add.image(1280, 300, 'bg');

    gameState.water = this.physics.add.staticGroup();

    for (let i = 50; i <= 20000; i += 125) {
      gameState.water.create(i, 600, 'water');
    }

    gameState.platforms = this.physics.add.staticGroup();

    platformsArray.forEach(({ x, y }) => {
      gameState.platforms.create(x, y, 'grass1');
    });

    gameState.player = this.physics.add.sprite(50, 110, 'hero').setScale(0.5);

    this.cameras.main.setBounds(0, 0, gameState.width, 600);

    this.physics.world.setBounds(0, 0, gameState.width,
      gameState.configHeight + gameState.player.height);

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);

    gameState.player.setCollideWorldBounds(true);

    this.physics.add.collider(gameState.player, gameState.platforms);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.createAnimations();
  }

  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('running-hero', { start: 7, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('jumping-hero', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin'),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (gameState.cursors.right.isDown) {
      gameState.player.flipX = false;
      gameState.player.setVelocityX(gameState.speed);
      gameState.player.anims.play('run', true);
    } else if (gameState.cursors.left.isDown) {
      gameState.player.flipX = true;
      gameState.player.setVelocityX(-gameState.speed);
      gameState.player.anims.play('run', true);
    } else if (gameState.cursors.up.isDown
    && gameState.player.body.touching.down) {
      gameState.player.anims.play('jump', true);
      gameState.player.setVelocityY(-550);
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }
}

export default MyScene;
