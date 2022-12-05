import axios from 'axios';

import { serverBaseURL } from '../../constants';
import store from '../../store/store';

export interface UserData {
  email: string;
  password: string;
}

const loginUser = async (userData: UserData) => {
  const res = await axios.post(serverBaseURL + '/api/auth/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

export interface RefreshData {
  access_token: string;
  refresh_token: string;
}

const refresh = async (tokens: RefreshData) => {
  const res = await axios.post(serverBaseURL + '/api/auth/refresh', tokens);

  const user = store.getState().auth.user;

  if (res.data) {
    const updatedUser = {
      ...user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  return res.data;
};

const logoutUser = () => {
  localStorage.removeItem('user');
};

const authService = {
  loginUser,
  logoutUser,
  refresh
};

export default authService;
