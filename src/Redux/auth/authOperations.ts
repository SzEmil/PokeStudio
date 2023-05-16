import { fireApp, fireDatabase } from '../../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
      const cardsArr: hotpokeData[] = [{ dummy: 'dummy' }];
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
        cards: cardsArr,
        coins: 0,
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
        coins: 0,
      });

      const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
      const { email: userEmail, username }: UserType = userSnapshot.val();
      const { cards } = userSnapshot.val();
      const { coins } = userSnapshot.val();

      return { email: userEmail, username, cards, coins };
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

export const refreshUser = createAsyncThunk<
  {
    email: string;
    username: string;
    cards: hotpokeData[] | null;
    coins: number | null;
  },
  void,
  { rejectValue: string }
>('auth/refreshUser', async (_, thunkAPI) => {
  try {
    return new Promise<{
      email: string;
      username: string;
      cards: hotpokeData[] | null;
      coins: number | null;
    }>((resolve, reject) => {
      onAuthStateChanged(fireAuth, async user => {
        if (user) {
          try {
            const userSnapshot = await get(
              ref(fireDatabase, 'users/' + user.uid)
            );
            const {
              email: userEmail,
              username,
              cards,
              coins,
            } = userSnapshot.val();
            resolve({ email: userEmail, username, cards, coins });
            console.log('użtkownik autoryzowany i zalogowany');
          } catch (error) {
            reject(error);
          }
        } else {
          console.log('użtkownik brak autoryzacji');
          resolve({ email: '', username: '', cards: null, coins: null }); // Jeżeli użytkownik nie jest zalogowany, zwróć puste dane
        }
      });
    });
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

type hotpokeData = Record<string, unknown>;
export const addCard = createAsyncThunk(
  'auth/addCard',
  async (card: hotpokeData, thunkAPI) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
        const { cards } = userSnapshot.val();

        await update(ref(fireDatabase, 'users/' + user.uid), {
          cards: [...cards, card],
        });

        return card;
      } else {
        throw new Error('Użytkownik niezalogowany');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
