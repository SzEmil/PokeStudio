import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { pokemonsReducer } from './pokemons/pokemonsSlice';
import { filterReducer } from './filter/filterSlice';
import { pokemonInfoReducer } from './pokemonInfo/pokemonInfoSlice';
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
  whitelist: ['pokemonsData'],
};

const pokemonInfoPersistConfig = {
  key: 'pokemonInfo',
  storage,
  whitelist: ['hotPoke', 'date'],
};

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
export const store = configureStore({
  reducer: {
    pokemonInfo: persistReducer(pokemonInfoPersistConfig, pokemonInfoReducer),
    pokemons: persistReducer(pokemonsPersistConfig, pokemonsReducer),
    filter: filterReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ignoredActions,
    },
  }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
