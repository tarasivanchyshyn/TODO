import axios from 'axios';

import { serverBaseURL } from '../../constants';
import { logout, refresh } from '../../store/authSlice';
import store from '../../store/store';

const instance = axios.create({
  baseURL: serverBaseURL
});

instance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.user?.accessToken;
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const user = store.getState().auth.user;
      try {
        if (user) {
          const newTokens = await store.dispatch(
            refresh({
              access_token: user.accessToken,
              refresh_token: user.refreshToken
            })
          );
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newTokens.payload.accessToken}`
          };
          return instance.request(originalRequest);
        }
      } catch {
        store.dispatch(logout());
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
