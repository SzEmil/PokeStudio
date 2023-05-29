import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logOutUser } from './authOperations';
import { refreshUser } from './authOperations';
import { addCard, quickSellCard } from './authOperations';
import { buyPack } from './authOperations';
import { deleteCard } from './authOperations';

type hotpokeData = Record<string, unknown>;
export type authStateType = {
  user: {
    username: string | null | undefined;
    email: string | null | undefined;
    cards: hotpokeData[] | [];
    coins: number | null;
    cookies: boolean;
  };
  token: null | string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isRefreshing: boolean;
  isLoading?: boolean;
  error: any;
};

const authInitialState: authStateType = {
  user: { username: null, email: null, cards: [], coins: 0, cookies: false },
  token: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
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
      state.user.coins = action.payload.coins;
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
        state.user.cards = action.payload.cards;
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
      state.user.cards = [...state.user.cards, action.payload.card];
    });

    builder.addCase(quickSellCard.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(quickSellCard.fulfilled, (state, action) => {
      state.user.coins = action.payload.newCoins;
    });

    builder.addCase(buyPack.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(buyPack.fulfilled, (state, action) => {
      state.user.coins = action.payload.newCoins;
    });

    builder.addCase(deleteCard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      (state.isLoading = false), (state.error = null);
      state.user.cards = action.payload.newCards;
      state.user.coins = action.payload.newCoins;
    });
  },
});

export const { importAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
