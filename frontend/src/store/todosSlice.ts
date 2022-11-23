import { format } from 'date-fns';
import { faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dateFormat, ascendOrder } from '../constants';
import { dateSortOption, textSortOption } from '../constants';
import {
  compareTextAscend,
  compareTextDescend,
  compareDateAscend,
  compareDateDescend
} from '../helpers/compareFunctions';
import todoService from '../api/services/todos';
import { AuthState } from './authSlice';

export const filters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export interface Todo {
  _id: string;
  done: boolean;
  text: string;
  creationDate: string;
  expirationDate: string;
}

export interface TodosState {
  todos: Todo[];
  filterBy: string;
  sortIcon: IconDefinition;
  searchedValue: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | unknown;
}

const initialState: TodosState = {
  todos: [],
  filterBy: filters.ALL,
  sortIcon: faSort,
  searchedValue: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

export const getTodos = createAsyncThunk(
  'todos/getAll',
  async (_, thunkAPI) => {
    try {
      const { auth } = (await thunkAPI.getState()) as { auth: AuthState };
      const token = auth.user?.token;
      return await todoService.getAllTodos(token);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface todoData {
  text: string;
  creationDate: string;
  expirationDate: string;
}
export const createTodo = createAsyncThunk(
  'todos/create',
  async (todoData: todoData, thunkAPI) => {
    try {
      const { auth } = (await thunkAPI.getState()) as { auth: AuthState };
      const token = auth.user?.token;
      return await todoService.createTodo(todoData, token);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      const date = new Date();
      const now = format(date, dateFormat);
      const tomorrow = format(date.setHours(24, 0, 0, 0), dateFormat);

      const { id, enteredText } = action.payload;
      state.todos = [
        {
          _id: id,
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
          _id: id,
          done: false,
          text: enteredText,
          creationDate: createdDate,
          expirationDate: expiringDate
        },
        ...state.todos
      ];
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((el) => el._id !== action.payload);
    },
    removeCompleted: (state) => {
      state.todos = state.todos.filter((el) => !el.done);
    },
    toggleTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (el) => el._id === action.payload
      );
      state.todos[todoIndex].done = !state.todos[todoIndex].done;
    },
    updateTodo: (state, action) => {
      const { id, enteredText, createdDate, expiringDate } = action.payload;
      const todoIndex = state.todos.findIndex((el) => el._id === id);
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
    },
    search: (state, action) => {
      state.searchedValue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload || [];
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.unshift(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
