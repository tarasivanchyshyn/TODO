import axios from 'axios';
import { serverBaseURL } from '../../constants';

// const url = 'http://localhost:5000';

const instance = axios.create({
  baseURL: serverBaseURL
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default instance;
