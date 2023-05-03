import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomPokemon } from './pokemonInfoOperations';
import { PayloadAction } from '@reduxjs/toolkit';

type PokeApiRandomType = Record<string, unknown>;

export type PokeInfoStateType = {
  pokeMoreInfo: PokeApiRandomType | null;
  isLoading: boolean;
  error: any;
};
const handlePending = (state: PokeInfoStateType) => {
  state.isLoading = true;
};

const handleRejected = (
  state: PokeInfoStateType,
  action: PayloadAction<any>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

const pokemonInfoInitialState: PokeInfoStateType = {
  pokeMoreInfo: null,
  isLoading: false,
  error: null,
};

const pokemonInfoSlice = createSlice({
  name: 'pokemonInfo',
  initialState: pokemonInfoInitialState,
  reducers: {
    importInfoData: state => state,
  },
  extraReducers: builder => {
    builder.addCase(fetchRandomPokemon.pending, handlePending),
      builder.addCase(fetchRandomPokemon.rejected, handleRejected),
      builder.addCase(fetchRandomPokemon.fulfilled, (state, action) => {
        state.pokeMoreInfo = action.payload;
        (state.isLoading = false), (state.error = null);
      });
  },
});

export const { importInfoData } = pokemonInfoSlice.actions;
export const pokemonInfoReducer = pokemonInfoSlice.reducer;
