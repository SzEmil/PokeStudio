import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { pokemonsReducer } from './pokemons/pokemonsSlice';
import { filterReducer } from './filter/filterSlice';
import { pokemonInfoReducer } from './pokemonInfo/pokemonInfoSlice';
import { authReducer } from './auth/authSlice';
import { pokeShopReducer } from './pokeShop/pokeShopSlice';

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
  whitelist: ['pokemonsData', 'searchPokemons'],
};

const pokemonInfoPersistConfig = {
  key: 'pokemonInfo',
  storage,
  whitelist: ['hotPoke', 'pokeDetails', 'date'],
};

const authPersistConfig = {
  key: 'authPokeStudio',
  storage,
  whitelist: ['token', 'user'],
};

const pokeShopPersistConfig = {
  key: 'pokeShop',
  storage,
  whitelist: ['packedPokemon'],
};

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
export const store = configureStore({
  reducer: {
    pokemonInfo: persistReducer(pokemonInfoPersistConfig, pokemonInfoReducer),
    pokemons: persistReducer(pokemonsPersistConfig, pokemonsReducer),
    filter: filterReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    pokeShop: persistReducer(pokeShopPersistConfig, pokeShopReducer),
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ignoredActions,
    },
  }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
