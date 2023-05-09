import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomPokemon } from './pokemonInfoOperations';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchMoreDetailsPokemon } from './pokemonInfoOperations';
import { fetchPokemonById } from './pokemonInfoOperations';

type PokeApiRandomType = Record<string, unknown>;

export type PokeInfoStateType = {
  hotPoke: PokeApiRandomType;
  pokeDetails: PokeApiRandomType;
  isLoading: boolean;
  isLoadingMoreDetails: boolean;
  error: any;
  date: string | null;
};

function getFormattedDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();
  return `${day}-${month}-${year}`;
}

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
  hotPoke: {
    overview: null,
    details: null,
  },
  pokeDetails: {
    overview: null,
    details: null,
  },
  isLoading: false,
  isLoadingMoreDetails: false,
  error: null,
  date: null,
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
        state.hotPoke.overview = action.payload;
        (state.isLoading = false),
          (state.error = null),
          (state.date = getFormattedDate());
      });

    builder.addCase(fetchMoreDetailsPokemon.fulfilled, (state, action) => {
      state.hotPoke.details = action.payload;
      state.isLoadingMoreDetails = false;
    });
    builder.addCase(fetchMoreDetailsPokemon.pending, state => {
      state.isLoadingMoreDetails = true;
    });
    builder.addCase(fetchMoreDetailsPokemon.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingMoreDetails = false;
    });

    builder.addCase(fetchPokemonById.pending, state => {
      state.isLoadingMoreDetails = true;
    });
    builder.addCase(fetchPokemonById.rejected, (state, action) => {
      state.isLoadingMoreDetails = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPokemonById.fulfilled, (state, action) => {
      state.pokeDetails.overview = action.payload;
      state.isLoadingMoreDetails = false;
    });
  },
});

export const { importInfoData } = pokemonInfoSlice.actions;
export const pokemonInfoReducer = pokemonInfoSlice.reducer;
