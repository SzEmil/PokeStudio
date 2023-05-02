import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemons } from './pokemonsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const pokemonsInitialState = {
  pokemons: [],
  isLoading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsInitialState,
  reducers: {},
  extraReducers: {
    [fetchPokemons.pending]: handlePending,
    [fetchPokemons.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.pokemons = action.payload;
    },
    [fetchPokemons.rejected]: handleRejected,
  },
});

export const { importData } = pokemonSlice.actions;
export const pokemonsReducer = pokemonSlice.reducer;