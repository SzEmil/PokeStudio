import { PokeInfoStateType } from './pokemonInfoSlice';

export const selectRandomPokemon = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.pokeMoreInfo;

export const selectRandomPokemonIsLoading = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.isLoading;

export const selectRandomPokemonError = (state: {
  pokemonInfo: PokeInfoStateType;
}) => state.pokemonInfo.error;
