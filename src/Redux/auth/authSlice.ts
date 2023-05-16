import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logOutUser } from './authOperations';
import { refreshUser } from './authOperations';
import { addCard } from './authOperations';
type hotpokeData = Record<string, unknown>;
export type authStateType = {
  user: {
    username: string | null | undefined;
    email: string | null | undefined;
    cards: hotpokeData[];
    coins: number | null;
  };
  token: null | string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isRefreshing: boolean;
  error: any;
};

const authInitialState: authStateType = {
  user: { username: null, email: null, cards: [], coins: null },
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
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
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
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      state.user.cards = action.payload.cards;
      state.user.coins = action.payload.coins;
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
      state.user.cards = [];
      state.user.coins = null;
    });

    builder.addCase(refreshUser.pending, state => {
      state.isRefreshing = true;
      state.isLoggingIn = true;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.isRefreshing = false;
      state.isLoggingIn = false;
      state.error = action.payload;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      if (action.payload.email !== '' && action.payload.username !== '') {
        // Loged User
        state.isLoggedIn = true;
        state.isLoggingIn = false;
        state.isRefreshing = false;
        state.user.email = action.payload.email;
        state.user.username = action.payload.username;
        state.user.coins = action.payload.coins;
      } else {
        // LogOut User
        state.isLoggedIn = false;
        state.isLoggingIn = false;
        state.isRefreshing = false;
        state.user.email = null;
        state.user.username = null;
        state.user.cards = [];
        state.user.coins = null;
      }
    });

    builder.addCase(addCard.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.user.cards = [...state.user.cards, action.payload];
    });
  },
});

export const { importAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
