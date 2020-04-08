// eslint-disable-next-line import/no-unresolved
import '@babel/polyfill';
import leaderBoardApi from '../../src/api/leaderboard';

const { sendUserScore, getUserScores } = leaderBoardApi();

test('should successfully send a user score if all parameters are correct', async () => {
  const { data: { result } } = await sendUserScore('Joe', 10);
  expect(result).toBe('Leaderboard score created correctly.');
});

test('should successfully return the top 5 scores saved', async () => {
  const result = await getUserScores();
  expect(typeof result).toBe('object');
  expect(result.length).toEqual(5);
});
