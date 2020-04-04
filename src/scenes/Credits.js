/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
import 'phaser';
import gameState from '../state/state';
import config from '../config/config';

class Credits extends Phaser.Scene {
  constructor() {
    super({ key: 'Credits' });
  }

  preload() {
    this.load.spritesheet('codey_sled', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Codey+Tundra/codey_sled.png', { frameWidth: 81, frameHeight: 90 });
  }

  create() {
    gameState.player = this.add.sprite(config.width / 2, config.height / 2, 'codey_sled');

    this.anims.create({
      key: 'sled',
      frames: this.anims.generateFrameNumbers('codey_sled'),
      frameRate: 10,
      repeat: -1,
    });

    gameState.player.angle = 20;
  }

  update() {
    gameState.player.anims.play('sled', true);
  }
}

export default Credits;
