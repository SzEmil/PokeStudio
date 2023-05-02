import { PokeState } from './pokemonsSlice';
import { Pokemon } from './pokemonsSlice';
export const selectPokemons = (state: PokeState): Pokemon[] =>
  state.pokemons.pokemons;
export const selectError = (state: PokeState) => state.error;
export const selectIsLoading = (state: PokeState) => state.isLoading;
