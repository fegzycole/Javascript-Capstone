import axios from './axios';

const leaderBoard = (() => {
  const compare = (a, b) => {
    let comparison = 0;
    if (a.score < b.score) {
      comparison = 1;
    } else if (a.score > b.score) {
      comparison = -1;
    }
    return comparison;
  };

  const sendUserScore = async (name, score) => {
    try {
      const result = await axios().post('/games/nP1GMNxEihjvVrq4hTuI/scores', {
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
      const { data: { result } } = await axios().get('/games/nP1GMNxEihjvVrq4hTuI/scores');
      return result.sort(compare).slice(0, 5);
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
