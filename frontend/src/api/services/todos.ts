import { todoData, updateTodoData } from '../../store/todosSlice';
import instance from './axios';

const getAllTodos = async (token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await instance.get('/api/todos', config);
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
    const res = await instance.post('/api/todos', todoData, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (todoData: updateTodoData, token?: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await instance.put(
      '/api/todos/' + todoData.id,
      todoData,
      config
    );
    return res.data;
  } catch (err) {
    console.log(err);
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
      const res = await instance.delete('/api/todos/' + todoId, config);
      return res.data;
    } else {
      const res = await instance.delete('/api/todos', config);
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const todoService = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};

export default todoService;
