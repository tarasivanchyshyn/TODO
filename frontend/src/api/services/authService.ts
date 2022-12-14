import axios from 'axios';

import { serverBaseURL } from '../../constants';
import { RefreshData, UserData } from '../../store/authSlice';
import store from '../../store/store';

export const registerUser = async (userData: UserData) => {
  const res = await axios.post(serverBaseURL + '/api/auth/register', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const loginUser = async (userData: UserData) => {
  const res = await axios.post(serverBaseURL + '/api/auth/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

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
  registerUser,
  loginUser,
  logoutUser,
  refresh
};

export default authService;
