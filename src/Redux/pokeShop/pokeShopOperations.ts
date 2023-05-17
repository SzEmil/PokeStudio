import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { fireApp, fireDatabase } from '../../firebase';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from 'firebase/auth';
// import { set, ref, update, get } from 'firebase/database';

// const fireAuth = getAuth(fireApp);
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
