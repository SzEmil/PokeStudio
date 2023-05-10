import { PokeState } from './pokemonsSlice';
import { Pokemon } from './pokemonsSlice';
import { selectFilterInput } from '../filter/filterSelectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectPokemons = (state: { pokemons: PokeState }): Pokemon[] => {
  //  console.log('sam state teraz taki', state);
  return state.pokemons.pokemonsData;
};

export const selectError = (state: { pokemons: PokeState }) =>
  state.pokemons.error;

export const selectIsLoading = (state: { pokemons: PokeState }) =>
  state.pokemons.isLoading;

export const selectFilteredPokemons = createSelector(
  [selectPokemons, selectFilterInput],
  (pokemons, filter) => {
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  }
);
