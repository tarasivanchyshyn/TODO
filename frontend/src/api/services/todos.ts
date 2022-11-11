import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from '../../store/todosSlice';

export const getAllTodos = async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('https://todos-h97u.onrender.com/api/todos');
    dispatch(todosActions.setTodos(res.data));
  } catch (err) {
    console.log(err);
  }
};
