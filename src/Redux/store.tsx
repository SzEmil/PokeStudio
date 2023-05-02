import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { pokemonsReducer } from './pokemons/pokemonsSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const pokemonsPersistConfig = {
  key: 'pokemons',
  storage,
  whitelist: ['pokemons'],
};

export const store = configureStore({
  reducer: {
    pokemons: persistReducer(pokemonsPersistConfig, pokemonsReducer),
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
