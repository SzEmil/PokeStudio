import { filterStatusType } from './filterSlice';

export const selectFilterInput = (state: { filter: filterStatusType }) =>
  state.filter.input;

export const selectFilterTypes = (state: { filter: filterStatusType }) =>
  state.filter.types;

export const selectFilterGeneration = (state: { filter: filterStatusType }) =>
  state.filter.generation;

export const selectFilterSort = (state: { filter: filterStatusType }) =>
  state.filter.sort;
