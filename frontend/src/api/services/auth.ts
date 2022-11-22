import axios from 'axios';
import { serverBaseURL } from '../../constants';

export interface UserData {
  email: string;
  password: string;
}

export const loginUser = async (userData: UserData) => {
  const res = await axios.post(serverBaseURL + '/api/auth/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
