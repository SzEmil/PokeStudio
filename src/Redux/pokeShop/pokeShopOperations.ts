import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = `https://pokeapi.co/api/v2`;

export const fetchPackedPokemon = createAsyncThunk(
  'pokeShop/fetchPackedPokemon',
  async (id: number | undefined, thunkAPI) => {
    try {
      const response = await axios.get(`/pokemon/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPackedPokemonDetails = createAsyncThunk(
  'pokeShop/fetchPackedPokemonDetails',
  async (url: string, thunkAPI) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
