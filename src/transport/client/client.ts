import axios from 'axios';

const Client = axios.create({
  baseURL: 'http://showroom.eis24.me/api/v4/test',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer `,
  },
});

Client.interceptors.response.use(
  (response) => {
    console.log(`status: ${response.status}`, `url: ${response.config.url}`);
    return response;
  },
  (err) => {
    const {
      response: {},
    } = err;
    console.log(err);
    console.error(`${err} ${err.stack}`);
    return Promise.reject(err);
  }
);

export { Client };
