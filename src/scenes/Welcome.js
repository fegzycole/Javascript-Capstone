/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import gameState from '../state/state';
import images from '../preloaders/images';

class WelcomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomeScene' });
  }

  preload() {
    ['bg', 'leaderboard'].forEach((imageName) => {
      const bg = images.find((image) => image.name === imageName);
      this.load.image(bg.name, bg.path);
    });

    this.load.html('nameform', 'assets/form/nameform.html');
  }

  create() {
    this.add.image(500, 300, 'bg');

    gameState.leaderBoardButton = this.add.sprite(500, 360, 'leaderboard').setScale(0.5, 0.5);

    const text = this.add.text(240, 150, 'Please enter your name to start the game',
      { color: 'black', fontSize: '25px ' });

    const domElement = this.add.dom(gameState.configWidth / 2, gameState.configHeight / 2 - 50).createFromCache('nameform');

    gameState.leaderBoardButton.setInteractive();

    domElement.addListener('click');

    domElement.on('click', (event) => {
      if (event.target.name === 'startButton') {
        const inputText = domElement.getChildByName('nameField');

        if (inputText.value !== '') {
          domElement.removeListener('click');
          domElement.setVisible(false);

          gameState.user = { name: inputText.value, score: gameState.score };
          this.scene.start('GameScene');
        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });


    gameState.leaderBoardButton.on('pointerup', () => {
      this.scene.start('LeaderboardScene');
    });
  }
}

export default WelcomeScene;
