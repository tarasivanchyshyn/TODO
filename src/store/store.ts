import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  done: boolean;
  text: string;
  creationDate: Date;
  expirationDate: Date;
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
      const now = new Date();
      let tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);

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
    removeTodo: (state, action) => {},
    toggleTodo: (state, action) => {
      const todoIndex = state.todos.findIndex((el) => el.id === action.payload);
      state.todos[todoIndex].done = !state.todos[todoIndex].done;
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
