import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type MyData = Record<string, unknown>;
axios.defaults.baseURL = ` https://pokeapi.co/api/v2`;

function randomPokeId() {
  return Math.floor(Math.random() * 898) + 1;
}

export const fetchRandomPokemon = createAsyncThunk<MyData, number>(
  'pokemonInfo/fetchMoreData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/pokemon/${randomPokeId()}`);
      // console.log(response.data);
      return response.data as MyData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreDetailsPokemon = createAsyncThunk(
  'pokemons/fetchMoreDetails',
  async (url: string, thunkAPI) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
