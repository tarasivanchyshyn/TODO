import axios from 'axios';

// export const getAllTodos = () =>
//   axios.get('https://todos-h97u.onrender.com/api/todos');

export const getAllTodos = async () => {
  const res = await axios.get('https://todos-h97u.onrender.com/api/todos');
  return res.data;
};
