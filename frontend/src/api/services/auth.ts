import axios from 'axios';
import { User } from '../../store/authSlice';

const url = 'https://todos-h97u.onrender.com/api/auth';
// const url = 'http://localhost:5000/api/auth';

export const loginUser = async (userData: User) => {
  const res = await axios.post(url + '/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
