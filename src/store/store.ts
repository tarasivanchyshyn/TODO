import { configureStore, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

export interface Todo {
  id: string;
  done: boolean;
  text: string;
  creationDate: string;
  expirationDate: string;
}

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: []
};

const todosSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const date = new Date();
      const now = format(date, 'dd.MM.yyyy HH:mm');
      const tomorrow = format(date.setHours(24, 0, 0, 0), 'dd.MM.yyyy HH:mm');

      const { id, enteredText } = action.payload;
      state.todos = state.todos.concat({
        id: id,
        done: false,
        text: enteredText,
        creationDate: now,
        expirationDate: tomorrow
      });
    },
    addTodoFromModal: (state, action) => {
      const { id, enteredText, createdDate, expiringDate } = action.payload;
      state.todos = state.todos.concat({
        id: id,
        done: false,
        text: enteredText,
        creationDate: createdDate,
        expirationDate: expiringDate
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todoIndex = state.todos.findIndex((el) => el.id === action.payload);
      state.todos[todoIndex].done = !state.todos[todoIndex].done;
    },
    updateTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (el) => el.id === action.payload.id
      );
      state.todos[todoIndex].text = action.payload.enteredText;
      state.todos[todoIndex].creationDate = action.payload.createdDate;
      state.todos[todoIndex].expirationDate = action.payload.expiringDate;
    }
  }
});

export const todosActions = todosSlice.actions;

const store = configureStore({
  reducer: todosSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
