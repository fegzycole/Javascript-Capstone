/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import images from '../preloaders/images';
import spriteSheets from '../preloaders/spriteSheets';
import platformsArray from '../generators/platforms';
import coinsCoordinates from '../generators/coins';
import endGame from '../helpers/gameOver';
import generateEnemies from '../generators/enemies';
import gameState from '../state/state';
import animate from '../helpers/animations';
import leaderBoardApi from '../api/leaderboard';

const { sendUserScore } = leaderBoardApi();

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
    gameState.user.score = 0;
    gameState.gameOver = false;
    gameState.scoreText = this.add.text(0, 10, `Score: ${gameState.user.score}`,
      { fontSize: '30px', fill: '#000000' }).setScrollFactor(0);
    gameState.scoreText.fixedToCamera = true;
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.createWaters();
    this.createPlatforms();
    this.createPlayer();
    this.createMaces();
    this.createFires();
    this.createCoins();
    this.createDoor();

    this.cameras.main.setBounds(0, 0, gameState.width, 600);
    this.physics.world.setBounds(0, 0, gameState.width,
      gameState.configHeight + gameState.player.height);
    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);

    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.mace, gameState.platforms);
    this.physics.add.collider(gameState.coins, gameState.platforms);
    this.physics.add.collider(gameState.fire, gameState.platforms);
    this.physics.add.collider(gameState.door, gameState.platforms);

    animate(this);
  }

  update() {
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
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }

    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)
    && gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-330);
    }

    if (gameState.player.y > gameState.configHeight + 20 && gameState.shakeSessions === 0) {
      this.cameras.main.shake(240, 0.01, false);
      gameState.shakeSessions += 1;
      endGame(gameState, this);
    }
  }

  createPlatforms() {
    gameState.platforms = this.physics.add.staticGroup();

    platformsArray.forEach(({ x, y }) => {
      gameState.platforms.create(x, y, 'grass1');
    });
  }

  createWaters() {
    gameState.water = this.physics.add.staticGroup();

    for (let i = 50; i <= 50000; i += 125) {
      gameState.water.create(i, 610, 'water');
    }
  }

  createDoor() {
    gameState.door = this.physics.add.sprite(49940, 0, 'door').setScale(0.2, 0.2);

    this.physics.add.overlap(gameState.player, gameState.door, async () => {
      const { user: { name, score } } = gameState;

      try {
        if (score > 0) {
          await sendUserScore(name, score);
        }
        this.scene.start('ConcludingScene');
      } catch (error) {
        this.add.text(200, 180, error.message, { fontSize: '25px', fill: '#302d2d' }).setScrollFactor(0);
      }
    });
  }

  createFires() {
    gameState.fire = this.physics.add.group();

    generateEnemies.generateFire().forEach(({ x, y }) => {
      gameState.fire.create(x, y, 'flame');
    });

    this.physics.add.collider(gameState.player, gameState.fire, (player) => {
      player.setTint(0x000000);
      endGame(gameState, this);
    });
  }

  createMaces() {
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

    this.physics.add.collider(gameState.player, gameState.mace, (player) => {
      player.setTint(0xff0000);
      endGame(gameState, this);
    });
  }

  createCoins() {
    gameState.coins = this.physics.add.group();

    coinsCoordinates.forEach(({ x, y }) => {
      const coin = gameState.coins.create(x, y, 'coin');
      coin.setScale(0.3, 0.3);
    });

    this.physics.add.overlap(gameState.player, gameState.coins, this.collectCoin);
  }

  createPlayer() {
    gameState.player = this.physics.add.sprite(50, 110, 'hero').setScale(0.5);
    gameState.player.setCollideWorldBounds(true);
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    gameState.user.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.user.score}`);
  }
}

export default GameScene;
