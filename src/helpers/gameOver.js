import leaderBoardApi from '../api/leaderboard';

const endGame = async (gameState, scene) => {
  gameState.gameOver = true;

  scene.physics.pause();

  const { user: { name, score } } = gameState;

  gameState.mace.move.forEach((maceTween) => {
    maceTween.stop();
  });

  gameState.player.anims.play('move', false);

  gameState.player.anims.play('idle', false);

  try {
    if (score > 0) {
      await leaderBoardApi().sendUserScore(name, score);
    }
  } catch (error) {
    scene.add.text(200, 180, error.message, { fontSize: '25px', fill: '#302d2d' }).setScrollFactor(0);
  }

  scene.add.text(450, 250, 'Game Over', { fontSize: '25px', fill: '#302d2d' }).setScrollFactor(0);
  scene.add.text(420, 300, 'Click to Restart', { fontSize: '25px', fill: '#302d2d' }).setScrollFactor(0);

  scene.input.on('pointerup', () => {
    gameState.score = 0;
    scene.scene.restart();
  });
};

export default endGame;
