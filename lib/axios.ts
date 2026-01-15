import axios from 'axios';

const immichApi = axios.create({
  baseURL: 'https://photos.test-d.pro/api',
  headers: {
    'x-api-key': process.env.IMMICH_API_KEY || '',
  },
});

export default immichApi;
