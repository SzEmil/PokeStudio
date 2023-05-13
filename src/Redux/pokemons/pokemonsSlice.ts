import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchPokemonByName, fetchPokemons } from './pokemonsOperations';

export interface Pokemon {
  name: string;
  url: string;
}
export interface PokeState {
  pokemonsData: Pokemon[];
  searchPokemons: Pokemon[];
  searchLoading: boolean;
  searchError: any;
  isLoading: boolean;
  error: SerializedError | boolean | null;
}

const handlePending = (state: PokeState) => {
  state.isLoading = true;
};

const handleRejected = (state: PokeState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const pokemonsInitialState: PokeState = {
  pokemonsData: [],
  searchPokemons: [],
  searchLoading: false,
  searchError: null,

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
    builder.addCase(
      fetchPokemons.fulfilled,
      (state: PokeState, action: PayloadAction<Pokemon[]>) => {
        state.isLoading = false;
        state.error = null;
        state.pokemonsData = [...state.pokemonsData, ...action.payload];
      }
    );
    builder.addCase(fetchPokemons.rejected, handleRejected);

    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.searchPokemons = action.payload;
    });
    builder.addCase(fetchPokemonByName.pending, state => {
      state.searchLoading = true;
    });
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.searchLoading = false;
      state.searchError = action.payload;
    });
  },
});

export const { importData } = pokemonSlice.actions;
export const pokemonsReducer = pokemonSlice.reducer;
