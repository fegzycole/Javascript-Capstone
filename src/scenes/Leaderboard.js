/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import gameState from '../state/state';
import images from '../helpers/images';
import leaderboardApi from '../api/leaderboard';

const { getUserScores } = leaderboardApi();

class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderboardScene' });
  }

  preload() {
    ['home', 'bg'].forEach((imageName) => {
      const bg = images.find((image) => image.name === imageName);
      this.load.image(bg.name, bg.path);
    });
  }

  async create() {
    this.add.image(500, 300, 'bg');

    this.add.text(380, 20, 'Top Scorers', { fontSize: '35px', fill: '#302d2d' });

    try {
      const userScores = await getUserScores();

      userScores.forEach((score, index) => {
        this.add.text(380, 100 * (index + 1), `${index + 1}. ${score.user} ${score.score}`,
          { fontSize: '30px', fill: '#302d2d' });
      });
    } catch (error) {
      this.add.text(280, 240, error.message, { fontSize: '25px', fill: '#302d2d' });
    }

    gameState.homeButton = this.add.sprite(500, 500, 'home').setScale(0.5, 0.5);

    gameState.homeButton.setInteractive();

    gameState.homeButton.on('pointerup', () => {
      this.scene.start('WelcomeScene');
    });
  }
}

export default LeaderboardScene;
