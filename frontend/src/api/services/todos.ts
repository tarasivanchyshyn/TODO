import axios from 'axios';

export const getAllTodos = () =>
  axios.get('https://todos-h97u.onrender.com/api/todos');
