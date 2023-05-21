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
      const cardsArr: hotpokeData[] = [{ card: { dummy: 'dummy' } }];
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
        coins: 1000,
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
      const cardsArr: hotpokeData[] = [{ card: { dummy: 'dummy' } }];
      await update(ref(fireDatabase, 'users/' + user.uid), {
        last_login: Date(),
        cards: cardsArr,
        // coins: 10000,
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
    cards: hotpokeData[] | [];
    coins: number | null;
  },
  void,
  { rejectValue: string }
>('auth/refreshUser', async (_, thunkAPI) => {
  try {
    return new Promise<{
      email: string;
      username: string;
      cards: hotpokeData[] | [];
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
            console.log(
              'użtkownik autoryzowany i zalogowany',
              username,
              cards,
              coins
            );
          } catch (error) {
            reject(error);
          }
        } else {
          console.log('użtkownik brak autoryzacji');
          resolve({ email: '', username: '', cards: [], coins: null }); // Jeżeli użytkownik nie jest zalogowany, zwróć puste dane
        }
      });
    });
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

type hotpokeData = {
  card: { dummy?: string };
  price?: number;
};
export const addCard = createAsyncThunk(
  'auth/addCard',
  async ({ card }: hotpokeData, thunkAPI) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
        const { cards } = userSnapshot.val();

        await update(ref(fireDatabase, 'users/' + user.uid), {
          cards: [...cards, card],
        });

        return { card };
      } else {
        throw new Error('Użytkownik niezalogowany');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const buyPack = createAsyncThunk(
  'auth/buyPack',
  async (price: number, thunkAPI) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
        const { coins } = userSnapshot.val();
        const newCoins = coins - price;
        console.log(newCoins);
        await update(ref(fireDatabase, 'users/' + user.uid), {
          coins: newCoins,
        });

        return { newCoins };
      } else {
        throw new Error('Użytkownik niezalogowany');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const quickSellCard = createAsyncThunk(
  'auth/QuickSellCard',
  async (price: number, thunkAPI) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
        const { coins } = userSnapshot.val();
        const newCoins = coins + price;
        await update(ref(fireDatabase, 'users/' + user.uid), {
          coins: newCoins,
        });

        return { newCoins };
      } else {
        throw new Error('Użytkownik niezalogowany');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
type cardType = {
  [x: string]: any;
  card: {
    overview: {
      id: number;
    };
  };
};
type deleteCardPropType = {
  id: number;
  price: number;
};
export const deleteCard = createAsyncThunk(
  'auth/deleteCard',
  async ({ id, price }: deleteCardPropType, thunkAPI) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userSnapshot = await get(ref(fireDatabase, 'users/' + user.uid));
        const { cards, coins } = userSnapshot.val();
        const newCoins = coins + price;
        const cardsArr = cards.slice(1);
        const cardIndex = cardsArr.findIndex(
          (card: cardType) => card.overview.id === id
        );
        const newCards = cards.filter(
          (_: any, index: number) => index !== cardIndex + 1
        );

        await update(ref(fireDatabase, 'users/' + user.uid), {
          cards: [...newCards],
          coins: newCoins,
        });

        return { newCards, newCoins };
      } else {
        throw new Error(
          'Error using delete Card: propably this card doesnt exist in database'
        );
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
