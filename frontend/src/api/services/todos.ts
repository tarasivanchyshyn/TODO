import axios from 'axios';

const url = 'https://todos-h97u.onrender.com/api/todos';
// const url = 'http://localhost:5000/api/todos';

export const getAllTodos = async (token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await axios.get(url, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
