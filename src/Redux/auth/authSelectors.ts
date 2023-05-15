import { UserType } from './authOperations';
import { authStateType } from './authSlice';
export const selectAuthState = (state: { auth: UserType }) => state.auth;

export const selectAuthIsRefreshing = (state: { auth: authStateType }) =>
  state.auth.isRefreshing;

export const selectAuthIsLoggedIn = (state: { auth: authStateType }) =>
  state.auth.isLoggedIn;

  export const selectAuthUser = (state: { auth: authStateType }) => state.auth.user;
