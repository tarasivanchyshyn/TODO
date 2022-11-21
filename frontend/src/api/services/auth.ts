import axios from 'axios';

const url = 'https://todos-h97u.onrender.com/api/auth';
// const url = 'http://localhost:5000/api/auth';

export interface UserData {
  email: string;
  password: string;
}

export const loginUser = async (userData: UserData) => {
  const res = await axios.post(url + '/login', userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
