import { createSlice } from '@reduxjs/toolkit';
import { fetchPackedPokemon } from './pokeShopOperations';
import { fetchPackedPokemonDetails } from './pokeShopOperations';

type hotpokeData = Record<string, unknown>;

export type pokeShopStateType = {
  packedPokemon: hotpokeData | null;
  isLoadingOverview: boolean;
  isLoadingMoreDetails: boolean;
  error: any;
};

const pokeShopInitialState: pokeShopStateType = {
  packedPokemon: {
    overview: null,
    details: null,
  },
  isLoadingOverview: false,
  isLoadingMoreDetails: false,
  error: null,
};

const pokeShopSlice = createSlice({
  name: 'pokeShop',
  initialState: pokeShopInitialState,
  reducers: {
    importPokeShopData: state => state,
    setPackedPokemonState(state) {
      (state.packedPokemon!.overview = null),
        (state.packedPokemon!.details = null);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPackedPokemon.pending, state => {
      state.isLoadingOverview = true;
    });
    builder.addCase(fetchPackedPokemon.rejected, (state, action) => {
      state.isLoadingOverview = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPackedPokemon.fulfilled, (state, action) => {
      state.isLoadingOverview = false;
      state.error = null;
      state.packedPokemon!.overview = action.payload;
    });

    builder.addCase(fetchPackedPokemonDetails.pending, state => {
      state.isLoadingMoreDetails = true;
    });
    builder.addCase(fetchPackedPokemonDetails.rejected, (state, action) => {
      state.isLoadingMoreDetails = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPackedPokemonDetails.fulfilled, (state, action) => {
      state.isLoadingMoreDetails = false;
      state.error = null;
      state.packedPokemon!.details = action.payload;
    });
  },
});

export const { importPokeShopData, setPackedPokemonState } =
  pokeShopSlice.actions;
export const pokeShopReducer = pokeShopSlice.reducer;
