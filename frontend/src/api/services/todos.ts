import axios from 'axios';
import { serverBaseURL } from '../../constants';
import { todoData, updateTodoData } from '../../store/todosSlice';

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
    localStorage.removeItem('user');
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
    localStorage.removeItem('user');
  }
};

const updateTodo = async (todoData: updateTodoData, token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await axios.put(
      serverBaseURL + '/api/todos/' + todoData.id,
      todoData,
      config
    );
    return res.data;
  } catch (err) {
    console.log(err);
    localStorage.removeItem('user');
  }
};

const deleteTodo = async (todoId: string | null, token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    if (todoId) {
      const res = await axios.delete(
        serverBaseURL + '/api/todos/' + todoId,
        config
      );
      return res.data;
    } else {
      const res = await axios.delete(serverBaseURL + '/api/todos', config);
      return res.data;
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem('user');
  }
};

const todoService = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};

export default todoService;
