import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchPokemons } from './pokemonsOperations';

export interface Pokemon {
  name: string;
  url: string;
}

export type PokeState = {
  pokemons: {
    pokemons: Pokemon[];
  };
  isLoading: boolean;
  error: SerializedError | boolean | null;
};

const handlePending = (state: PokeState) => {
  state.isLoading = true;
};

const handleRejected = (state: PokeState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const pokemonsInitialState: PokeState = {
  pokemons: {
    pokemons: [],
  },
  isLoading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: pokemonsInitialState,
  reducers: {
    importData: (state: PokeState) => state,
  },
  extraReducers: builder => {
    builder.addCase(fetchPokemons.pending, handlePending);
    builder.addCase(fetchPokemons.fulfilled, (state: PokeState, action) => {
      if ('payload' in action) {
        state.isLoading = false;
        state.error = null;
        state.pokemons = action.payload.pokemons;
      }
    });
    builder.addCase(fetchPokemons.rejected, handleRejected);
  },
});

export const { importData } = pokemonSlice.actions;
export const pokemonsReducer = pokemonSlice.reducer;
