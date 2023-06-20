import { initialStateType } from './pokeNewsSlice';

export const selectPokeNewsPosts = (state: { pokeNews: initialStateType }) =>
  state.pokeNews.posts;

  export const selectPokeNewsLoading = (state: { pokeNews: initialStateType }) =>
  state.pokeNews.isLoading;
