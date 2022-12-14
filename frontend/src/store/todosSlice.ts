import { faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ascendOrder, dateSortOption, textSortOption } from '../constants';
import {
  compareTextAscend,
  compareTextDescend,
  compareDateAscend,
  compareDateDescend
} from '../helpers/compareFunctions';
import todoService from '../api/services/todosService';

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
  async (filter: string, thunkAPI) => {
    try {
      const todos = await todoService.getAllTodos(filter);
      return { todos, filter };
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
      return await todoService.createTodo(todoData);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface updateTodoData {
  id: string;
  done?: boolean;
  text?: string;
  creationDate?: string;
  expirationDate?: string;
}
export const updateTodo = createAsyncThunk(
  'todos/update',
  async (todoData: updateTodoData, thunkAPI) => {
    const { id } = todoData;

    try {
      if (id) {
        return await todoService.updateTodo(todoData);
      }
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (todoId: string | null, thunkAPI) => {
    try {
      if (todoId) {
        return await todoService.deleteTodo(todoId);
      } else {
        return await todoService.deleteTodo(null);
      }
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
        state.todos = action.payload.todos || [];
        state.filterBy = action.payload.filter;
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
        if (action.payload) {
          state.todos.unshift(action.payload);
        }
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload) {
          const { _id } = action.payload;
          const todoIndex = state.todos.findIndex((el) => el._id === _id);

          state.isSuccess = true;
          state.todos[todoIndex] = {
            ...state.todos[todoIndex],
            ...action.payload
          };
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.id) {
          state.todos = state.todos.filter(
            (el) => el._id !== action.payload.id
          );
        } else {
          state.todos = state.todos.filter((el) => !el.done);
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
