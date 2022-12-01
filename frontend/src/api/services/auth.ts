import axios from 'axios';
import { serverBaseURL } from '../../constants';

export interface UserData {
  email: string;
  password: string;
}

// const url = 'http://localhost:5000';

const loginUser = async (userData: UserData) => {
  const res = await axios.post(serverBaseURL + '/api/auth/login', userData);
  // const res = await axios.post(url + '/api/auth/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const logoutUser = () => {
  localStorage.removeItem('user');
};

const authService = {
  loginUser,
  logoutUser
};

export default authService;
