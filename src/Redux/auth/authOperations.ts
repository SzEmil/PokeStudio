import { fireApp, fireDatabase } from '../../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { set, ref, update, get } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fireAuth = getAuth(fireApp);

export type UserType = {
  username?: string | null | undefined;
  email: string | null | undefined;
  password?: string | null | undefined;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: UserType, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        fireAuth,
        email!,
        password!
      );
      const user = userCredential.user;
      const userData = {
        username: username!,
        email: user.email,
      };

      set(ref(fireDatabase, 'users/' + user.uid), {
        username: username,
        email: email,
        password: password,
        userCreated: Date(),
        // profile_picture : imageUrl
      })
        .then(() => {
          console.log('user registered and loged');
        })
        .catch(error => {
          console.error(error);
        });

      return ({ username, email } = userData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserType, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        fireAuth,
        email!,
        password!
      );
      const user = userCredential.user;

      await update(ref(fireDatabase, 'users/' + user.uid), {
        last_login: Date(),
      });

      const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
      const { email: userEmail, username }: UserType = userSnapshot.val();

      return { email: userEmail, username };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, thunkAPI) => {
    try {
      await signOut(fireAuth);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
