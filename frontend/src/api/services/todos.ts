import axios from 'axios';
import { serverBaseURL } from '../../constants';
import { todoData } from '../../store/todosSlice';

const getAllTodos = async (token?: string) => {
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

const createTodo = async (todoData: todoData, token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await axios.post(
      serverBaseURL + '/api/todos',
      todoData,
      config
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const todoService = {
  getAllTodos,
  createTodo
};

export default todoService;
