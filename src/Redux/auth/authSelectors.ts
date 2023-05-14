import { UserType } from './authOperations';
export const selectAuthState = (state: { auth: UserType }) => state.auth;
