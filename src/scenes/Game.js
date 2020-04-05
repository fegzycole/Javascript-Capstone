/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import images from '../helpers/images';
import spriteSheets from '../helpers/spriteSheets';
import platformsArray from '../helpers/platforms';
import coinsCoordinates from '../helpers/coins';
import endGame from '../helpers/gameOver';
import generateEnemies from '../helpers/enemies';
import gameState from '../state/state';
import animate from '../helpers/animations';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
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
    gameState.shakeSessions = 0;

    gameState.gameOver = false;

    gameState.water = this.physics.add.staticGroup();

    for (let i = 50; i <= 50000; i += 125) {
      gameState.water.create(i, 610, 'water');
    }

    gameState.door = this.physics.add.sprite(49940, 0, 'door').setScale(0.2, 0.2);

    gameState.fire = this.physics.add.group();

    generateEnemies.generateFire().forEach(({ x, y }) => {
      gameState.fire.create(x, y, 'flame');
    });

    gameState.scoreText = this.add.text(0, 10, `Score: ${gameState.score}`,
      { fontSize: '30px', fill: '#000000' }).setScrollFactor(0);

    gameState.scoreText.fixedToCamera = true;

    gameState.mace = this.physics.add.group();

    generateEnemies.generateMace().forEach(({ x, y }) => {
      gameState.mace.create(x, y, 'mace');
    });

    gameState.mace.move = [];

    gameState.mace.children.entries.forEach((mace) => {
      mace.setScale(0.3, 0.3);
      const maceTween = this.add.tween({
        targets: mace,
        x: mace.x + 100,
        ease: 'Linear',
        duration: 1000,
        repeat: -1,
        yoyo: true,
      });
      gameState.mace.move.push(maceTween);
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
    this.physics.add.collider(gameState.door, gameState.platforms);

    this.physics.add.overlap(gameState.player, gameState.coins, this.collectCoin);
    this.physics.add.collider(gameState.player, gameState.mace, (player) => {
      player.setTint(0xff0000);
      endGame(gameState, this);
    });

    this.physics.add.collider(gameState.player, gameState.fire, (player) => {
      player.setTint(0x000000);
      endGame(gameState, this);
    });

    gameState.cursors = this.input.keyboard.createCursorKeys();

    animate(this);
  }

  update() {
    gameState.scoreText.x = this.cameras.cameras[0].x + 10;

    if (!gameState.gameOver) {
      gameState.coins.children.entries.forEach((coin) => {
        coin.anims.play('rotate', true);
      });
      gameState.fire.children.entries.forEach((fire) => {
        fire.anims.play('burn', true);
      });
    } else {
      gameState.coins.children.entries.forEach((coin) => {
        coin.anims.play('rotate', false);
      });
      gameState.fire.children.entries.forEach((fire) => {
        fire.anims.play('burn', false);
      });
    }

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
      gameState.player.setVelocityY(-320);
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }

    if (gameState.player.y > gameState.configHeight + 20 && gameState.shakeSessions === 0) {
      this.cameras.main.shake(240, 0.01, false);
      gameState.shakeSessions += 1;
      endGame(gameState, this);
    }
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  }
}

export default GameScene;
