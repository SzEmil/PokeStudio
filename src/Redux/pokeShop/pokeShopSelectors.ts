import { pokeShopStateType } from './pokeShopSlice';

export const selectPackedPokemon = (state: { pokeShop: pokeShopStateType }) =>
  state.pokeShop.packedPokemon;

export const selectPackedPokemonOverwievIsLoading = (state: {
  pokeShop: pokeShopStateType;
}) => state.pokeShop.isLoadingOverview;

export const selectPackedPokemonDetailsIsLoading = (state: {
  pokeShop: pokeShopStateType;
}) => state.pokeShop.isLoadingMoreDetails;
