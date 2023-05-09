import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = `https://pokeapi.co/api/v2`;

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchData',
  async (n: number, thunkAPI) => {
    try {
      const response = await axios.get(`/pokemon?limit=12&offset=${n}`);
      // console.log(response.data.results);
      return response.data.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
