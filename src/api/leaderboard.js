import axios from './axios';

const leaderBoard = (() => {
  const sendUserScore = async (name, score) => {
    try {
      const result = await axios().post('/games/RLw8MNMi48AwgCq79bQv/scores', {
        user: name,
        score,
      });
      return result;
    } catch (error) {
      throw new Error('Unable to update score board, check your internet!');
    }
  };

  const getUserScores = async () => {
    try {
      const { data: { result } } = await axios.get('/games/RLw8MNMi48AwgCq79bQv/scores');
      return result;
    } catch (error) {
      throw new Error('Unable to get scores at this time');
    }
  };

  return {
    sendUserScore,
    getUserScores,
  };
});

export default leaderBoard;
