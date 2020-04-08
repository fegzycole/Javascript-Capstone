/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import gameState from '../state/state';
import images from '../preloaders/images';
import spriteSheets from '../preloaders/spriteSheets';
import animate from '../helpers/animations';

class ConcludingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ConcludingScene' });
  }

  preload() {
    ['home', 'bg'].forEach((imageName) => {
      const bg = images.find((image) => image.name === imageName);
      this.load.image(bg.name, bg.path);
    });

    const {
      name, path, frameWidth, frameHeight,
    } = spriteSheets.find((sheet) => sheet.name === 'hero');
    this.load.spritesheet(name, path, { frameWidth, frameHeight });
  }

  create() {
    this.add.image(500, 300, 'bg');

    this.add.text(300, 180, 'Congratulations, you won!', { fontSize: '30px', fill: '#302d2d' });

    gameState.player = this.add.sprite(500, 300, 'hero').setScale(1.2, 1.2);

    gameState.homeButton = this.add.sprite(500, 395, 'home').setScale(0.5, 0.5);

    gameState.homeButton.setInteractive();

    animate(this);

    gameState.homeButton.on('pointerup', () => {
      this.scene.start('WelcomeScene');
    });
  }

  update() {
    gameState.player.anims.play('move', true);
  }
}

export default ConcludingScene;
