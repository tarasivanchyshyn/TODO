import { configureStore, createSlice } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: []
};

const todosSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addTodo: (state, action) => {},
    removeTodo: (state, action) => {},
    toggleTodo: (state) => {}
  }
});

export const todosActions = todosSlice.actions;

const store = configureStore({
  reducer: todosSlice.reducer
});

export default store;
