import { createSelector } from '@reduxjs/toolkit';
import { PokeState, Pokemon } from './pokemonsSlice';
import {
  selectFilterInput,
  selectFilterGeneration,
  selectFilterSort,
} from '../filter/filterSelectors';
import { pokeIdFromUrl } from '../../utils/pokeUtils';
import { GENERATIONS } from '../../data/types';

export const selectPokemons = (state: { pokemons: PokeState }): Pokemon[] =>
  state.pokemons.pokemonsData;

export const selectError = (state: { pokemons: PokeState }) =>
  state.pokemons.error;

export const selectIsLoading = (state: { pokemons: PokeState }) =>
  state.pokemons.isLoading;

export const selectFilteredPokemons = createSelector(
  [selectPokemons, selectFilterInput, selectFilterGeneration, selectFilterSort],
  (pokemons, filter, generation, sort) => {
    const text = filter.toLowerCase();
    let list = pokemons;
    if (text) list = list.filter(p => p.name.toLowerCase().includes(text));
    if (generation !== null) {
      const gen = GENERATIONS.find(g => g.id === generation);
      if (gen) {
        list = list.filter(p => {
          const id = pokeIdFromUrl(p.url);
          return id >= gen.range[0] && id <= gen.range[1];
        });
      }
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      const ai = pokeIdFromUrl(a.url);
      const bi = pokeIdFromUrl(b.url);
      return sort === 'id-desc' ? bi - ai : ai - bi;
    });
    return sorted;
  }
);

export const selectSearchPokemons = (state: { pokemons: PokeState }): Pokemon[] =>
  state.pokemons.searchPokemons;
