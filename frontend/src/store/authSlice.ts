import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser, loginUser } from '../api/services/auth';

const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '');
  } catch (error) {
    return null;
  }
};
const user = getUserFromLocalStorage();

export interface User {
  name?: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | unknown;
}

const initialState: AuthState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

export const login = createAsyncThunk(
  'auth/login',
  async (user: User, thunkAPI) => {
    try {
      return await loginUser(user);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
