import { todoData, updateTodoData } from '../../store/todosSlice';
import instance from './axios';

const getAllTodos = async (token?: string) => {
  try {
    const res = await instance.get('/api/todos');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createTodo = async (todoData: todoData, token?: string) => {
  try {
    const res = await instance.post('/api/todos', todoData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (todoData: updateTodoData, token?: string) => {
  try {
    const res = await instance.put('/api/todos/' + todoData.id, todoData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (todoId: string | null, token?: string) => {
  try {
    if (todoId) {
      const res = await instance.delete('/api/todos/' + todoId);
      return res.data;
    } else {
      const res = await instance.delete('/api/todos');
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
