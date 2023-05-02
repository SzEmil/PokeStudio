import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = ` https://pokeapi.co/api/v2`;

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/pokemon?limit=50&offset=0');
      console.log(response.data.results);
      return response.data.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
