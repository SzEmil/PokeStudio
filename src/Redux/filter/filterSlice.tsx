import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type filterStatusType = {
  input: string;
};
const filterInitialState: filterStatusType = {
  input: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilterData(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
  },
});

export const { setFilterData } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
