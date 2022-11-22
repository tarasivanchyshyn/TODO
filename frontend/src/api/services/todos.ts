import axios from 'axios';
import { serverBaseURL } from '../../constants';

export const getAllTodos = async (token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await axios.get(serverBaseURL + '/api/todos', config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
