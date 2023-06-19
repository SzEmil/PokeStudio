import { createSlice } from '@reduxjs/toolkit';


type post = {
  title: string;
  description: string;
  imgLink: string;
};

type initialStateType = {
  posts: post[];
};
const pokeNewsInitialState: initialStateType = {
  posts: [],
};

const pokeNewsSlice = createSlice({
  name: 'pokeNews',
  initialState: pokeNewsInitialState,
  reducers: {
    importData: state => state,
  },
  extraReducers() {},
});

export const { importData } = pokeNewsSlice.actions;
export const pokeNewsReducer = pokeNewsSlice.reducer;
