/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import WelcomeScene from '../scenes/Welcome';
import GameScene from '../scenes/Game';
import ConcludingScene from '../scenes/Conclusion';
import LeaderboardScene from '../scenes/Leaderboard';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  parent: 'divld',
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
  scene: [
    WelcomeScene,
    GameScene,
    ConcludingScene,
    LeaderboardScene,
  ],
  pixelArt: true,
  roundPixels: true,
};


export default config;
