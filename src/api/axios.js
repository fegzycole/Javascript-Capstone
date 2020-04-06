
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';

export default () => axios.create({
  baseURL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api',
});
