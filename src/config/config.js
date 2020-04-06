/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import WelcomeScene from '../scenes/Welcome';
import GameScene from '../scenes/Game';
import ConcludingScene from '../scenes/Conclusion';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  parent: 'phaser-example',
  fps: { target: 60 },
  backgroundColor: 'b9eaff',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      enableBody: true,

    },
  },
  scene: [WelcomeScene, GameScene, ConcludingScene],
};


export default config;
