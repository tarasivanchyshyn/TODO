import { configureStore, createSlice } from '@reduxjs/toolkit';

interface Todo {
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

      state.todos = state.todos.concat({
        id: action.payload.id,
        done: false,
        text: action.payload.enteredText,
        creationDate: now,
        expirationDate: tomorrow
      });
    },
    addTodoFromModal: (state, action) => {
      state.todos = state.todos.concat({
        id: action.payload.id,
        done: false,
        text: action.payload.enteredText,
        creationDate: action.payload.createdDate,
        expirationDate: action.payload.expiringDate
      });
    },
    removeTodo: (state, action) => {},
    toggleTodo: (state) => {}
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
