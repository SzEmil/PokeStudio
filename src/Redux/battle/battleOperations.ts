import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const easyTab = [
  1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48,
  50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 90, 92,
  96, 98, 100, 102, 104, 108, 109, 111, 113, 116, 118, 120, 123, 129, 131, 133,
  138, 140, 152, 155, 158, 161, 163, 165, 167, 170, 172, 174, 177, 179, 183,
  185, 187, 190, 193, 198, 200, 202, 204, 206, 209, 211, 213, 215, 218, 220,
  222, 228, 231, 234, 236, 238, 240, 246, 252, 255, 258, 261, 263, 265, 267,
  273, 276, 278, 280, 287, 290, 293, 296, 298, 300, 303, 307, 309, 311, 313,
  316, 318, 320, 322, 325, 328, 331, 333, 335, 337, 339, 341, 343, 345, 347,
  349, 351, 353, 355, 357, 359, 361, 363, 366, 369, 371, 374, 378, 380, 382,
  384, 386, 388, 390, 393, 396, 399, 401, 403, 406, 408, 410, 412, 415, 417,
  419, 422, 425, 427, 429, 431, 434, 436, 438, 440, 443, 446, 449, 451, 453,
  455, 457, 459, 461, 463, 465, 467, 469, 471, 474, 476, 478, 480,
];

const mediumTab = [2, 3, 5, 6];

axios.defaults.baseURL = ` https://pokeapi.co/api/v2`;

const getRandomIds = (array: number[], count: number) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
};

export const fetchAIPokemons = createAsyncThunk(
  'battleAI/fetchAIPokemons',
  async (type: string, thunkAPI) => {
    try {
      let idArray;

      if (type === 'easy') {
        idArray = getRandomIds(easyTab, 3);
      } else if (type === 'medium') {
        idArray = getRandomIds(mediumTab, 3);
      } else {
        return [];
      }

      const pokemons = [];

      for (const id of idArray) {
        try {
          const response = await axios.get(`/pokemon/${id}`);
          pokemons.push(response.data);
        } catch (error) {
          console.log('Error:', error);
        }
      }

      return pokemons;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

