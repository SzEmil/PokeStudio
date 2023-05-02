import { PokeState } from './pokemonsSlice';
import { Pokemon } from './pokemonsSlice';
export const selectPokemons = (state: { pokemons: PokeState }): Pokemon[]  => {
  console.log('sam state teraz taki', state);
  return state.pokemons.pokemonsData;
};

export const selectError = (state: PokeState) => state.error;
export const selectIsLoading = (state: PokeState) => state.isLoading;
