import { PokeInfoStateType } from './pokemonInfoSlice';

export const selectRandomPokemon = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.hotPoke;

export const selectRandomPokemonIsLoading = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.isLoading;

export const selectRandomPokemonError = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.error;

export const selectRandomPokemonDate = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.date;

export const selectisLoadingMoreInfo = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.isLoadingMoreDetails;

export const selectPokemonDetails = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.pokeDetails;
