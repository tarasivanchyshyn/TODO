import { configureStore, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { dateFormat, ascendOrder } from '../constants';
import { dateSortOption, textSortOption } from '../constants';
import {
  compareTextAscend,
  compareTextDescend,
  compareDateAscend,
  compareDateDescend
} from '../helpers/compareFunctions';

export const filters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export interface Todo {
  id: string;
  done: boolean;
  text: string;
  creationDate: string;
  expirationDate: string;
}

export interface TodosState {
  todos: Todo[];
  filterBy: string;
  sortIcon: IconDefinition;
}

const initialState: TodosState = {
  todos: [],
  filterBy: filters.ALL,
  sortIcon: faSort
};

const todosSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const date = new Date();
      const now = format(date, dateFormat);
      const tomorrow = format(date.setHours(24, 0, 0, 0), dateFormat);

      const { id, enteredText } = action.payload;
      state.todos = [
        {
          id: id,
          done: false,
          text: enteredText,
          creationDate: now,
          expirationDate: tomorrow
        },
        ...state.todos
      ];
    },
    addTodoFromModal: (state, action) => {
      const { id, enteredText, createdDate, expiringDate } = action.payload;
      state.todos = [
        {
          id: id,
          done: false,
          text: enteredText,
          creationDate: createdDate,
          expirationDate: expiringDate
        },
        ...state.todos
      ];
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    removeCompleted: (state) => {
      state.todos = state.todos.filter((el) => !el.done);
    },
    toggleTodo: (state, action) => {
      const todoIndex = state.todos.findIndex((el) => el.id === action.payload);
      state.todos[todoIndex].done = !state.todos[todoIndex].done;
    },
    updateTodo: (state, action) => {
      const { id, enteredText, createdDate, expiringDate } = action.payload;
      const todoIndex = state.todos.findIndex((el) => el.id === id);
      const todo = state.todos[todoIndex];

      todo.text = enteredText;
      todo.creationDate = createdDate;
      todo.expirationDate = expiringDate;
    },
    filterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    sortBy: (state, action) => {
      const { type, order } = action.payload;
      let todos = state.todos;

      switch (type) {
        case textSortOption:
          order === ascendOrder
            ? (todos = todos.sort(compareTextAscend))
            : (todos = todos.sort(compareTextDescend));
          break;
        case dateSortOption:
          order === ascendOrder
            ? (todos = todos.sort(compareDateAscend))
            : (todos = todos.sort(compareDateDescend));
          break;
      }
    },
    setIcon: (state, action) => {
      state.sortIcon = action.payload;
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
