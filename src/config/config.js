/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import MyScene from '../scenes/MyScene';
// import Level1 from '../scenes/Level1';
// import Level2 from '../scenes/Level2';
// import Level3 from '../scenes/Level3';
// import Level4 from '../scenes/Level4';
// import Credits from '../scenes/Credits';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  fps: { target: 60 },
  backgroundColor: 'b9eaff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      enableBody: true,

    },
  },
  scene: [MyScene],
  // scene: [Level1, Level2, Level3, Level4, Credits],
};


export default config;
