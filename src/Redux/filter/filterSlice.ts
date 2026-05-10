import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonType } from '../../data/types';

export type SortMode = 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc';

export type filterStatusType = {
  input: string;
  types: PokemonType[];
  generation: number | null;
  sort: SortMode;
};

const filterInitialState: filterStatusType = {
  input: '',
  types: [],
  generation: null,
  sort: 'id-asc',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilterData(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    toggleType(state, action: PayloadAction<PokemonType>) {
      const i = state.types.indexOf(action.payload);
      if (i >= 0) state.types.splice(i, 1);
      else state.types.push(action.payload);
    },
    setTypes(state, action: PayloadAction<PokemonType[]>) {
      state.types = action.payload;
    },
    setGeneration(state, action: PayloadAction<number | null>) {
      state.generation = action.payload;
    },
    setSort(state, action: PayloadAction<SortMode>) {
      state.sort = action.payload;
    },
    clearFilters(state) {
      state.input = '';
      state.types = [];
      state.generation = null;
      state.sort = 'id-asc';
    },
  },
});

export const {
  setFilterData,
  toggleType,
  setTypes,
  setGeneration,
  setSort,
  clearFilters,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
