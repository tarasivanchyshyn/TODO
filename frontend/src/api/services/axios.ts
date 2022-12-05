import axios from 'axios';

import { serverBaseURL } from '../../constants';
import { refresh } from '../../store/authSlice';
import store from '../../store/store';

const instance = axios.create({
  baseURL: serverBaseURL
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const user = store.getState().auth.user;

      if (user) {
        await store.dispatch(
          refresh({
            access_token: user?.accessToken,
            refresh_token: user?.refreshToken
          })
        );
      }
    } else {
      return Promise.reject(error);
    }
  }
);

instance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.user?.accessToken;
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default instance;
