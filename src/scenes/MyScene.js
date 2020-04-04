/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import 'phaser';
import images from '../helpers/images';
import spriteSheets from '../helpers/spriteSheets';
import platformsArray from '../helpers/platforms';
import coinsCoordinates from '../helpers/coins';
import generateEnemies from '../helpers/enemies';
import gameState from '../state/state';
import animate from '../helpers/animations';

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
    gameState.water = this.physics.add.staticGroup();

    for (let i = 50; i <= 50000; i += 125) {
      gameState.water.create(i, 610, 'water');
    }

    gameState.fire = this.physics.add.group();

    generateEnemies.generateFire().forEach(({ x, y }) => {
      gameState.fire.create(x, y, 'flame');
    });

    gameState.mace = this.physics.add.group();

    generateEnemies.generateMace().forEach(({ x, y }) => {
      gameState.mace.create(x, y, 'mace');
    });

    gameState.mace.children.entries.forEach((mace) => {
      mace.setScale(0.3, 0.3);
      gameState.mace.move = this.add.tween({
        targets: mace,
        x: mace.x + 100,
        ease: 'Linear',
        duration: 1000,
        repeat: -1,
        yoyo: true,
      });
    });

    gameState.coins = this.physics.add.group();

    coinsCoordinates.forEach(({ x, y }) => {
      const coin = gameState.coins.create(x, y, 'coin');
      coin.setScale(0.3, 0.3);
    });

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
    this.physics.add.collider(gameState.mace, gameState.platforms);
    this.physics.add.collider(gameState.coins, gameState.platforms);
    this.physics.add.collider(gameState.fire, gameState.platforms);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    animate(this);
  }

  update() {
    gameState.coins.children.entries.forEach((coin) => {
      coin.anims.play('rotate', true);
    });

    gameState.fire.children.entries.forEach((fire) => {
      fire.anims.play('burn', true);
    });

    if (gameState.cursors.right.isDown) {
      gameState.player.flipX = false;
      gameState.player.setVelocityX(gameState.speed);
      gameState.player.anims.play('move', true);
    } else if (gameState.cursors.left.isDown) {
      gameState.player.flipX = true;
      gameState.player.setVelocityX(-gameState.speed);
      gameState.player.anims.play('move', true);
    } else if (gameState.cursors.up.isDown
    && gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-330);
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }
}

export default MyScene;
