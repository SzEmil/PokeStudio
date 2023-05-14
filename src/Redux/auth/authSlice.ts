import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logOutUser } from './authOperations';

export type authStateType = {
  user: {
    username: string | null | undefined;
    email: string | null | undefined;
  };
  token: null | string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isRefreshing: boolean;
  error: any;
};

const authInitialState: authStateType = {
  user: { username: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    importAuthData: state => state,
  },
  extraReducers(builder) {
    builder.addCase(registerUser.pending, state => {
      state.isLoggingIn = true;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      (state.isLoggingIn = false),
        (state.error = action.payload),
        (state.isLoggedIn = false);
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    });

    builder.addCase(loginUser.pending, state => {
      state.isLoggingIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    });

    builder.addCase(logOutUser.pending, state => {
      state.isLoggingIn = true;
    });
    builder.addCase(logOutUser.rejected, state => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
    });
    builder.addCase(logOutUser.fulfilled, state => {
      state.user.email = null;
      state.user.username = null;
      state.isLoggedIn = false;
      state.isLoggingIn = false;
    });
  },
});

export const { importAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
