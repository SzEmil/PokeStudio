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

const mediumTab = [
  2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 22, 24, 26, 28, 30, 31, 33, 34,
  36, 38, 40, 42, 44, 45, 47, 49, 51, 53, 55, 57, 59, 62, 65, 68, 71, 76, 78,
  80, 82, 87, 89, 91, 99, 103, 105, 110, 112, 115, 119, 121, 124, 130, 134, 135,
  136, 142, 143, 149, 153, 156, 159, 162, 169, 176, 178, 181, 184, 186, 197,
  199, 219, 224, 232, 233, 248, 257, 260, 269, 272, 275, 282, 284, 286, 295,
  301, 305, 306, 350, 354, 376, 405,
];

const hardTab = [
  68, 130, 134, 135, 136, 143, 149, 169, 199, 248, 282, 286, 295, 350, 376, 405,
  432, 442, 448, 462, 466, 468, 472, 473, 477, 530, 534, 612, 625, 635, 663,
  689, 706, 715, 776, 784, 815, 887,
];

const legendaryTab = [
  144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 380, 381, 382, 383, 384, 385,
  483, 484, 487, 491, 492, 493, 643, 644, 646, 716, 718, 786, 791, 792, 800,
];

axios.defaults.baseURL = `https://pokeapi.co/api/v2`;

const getRandomIds = (array: number[], count: number) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const fetchAIPokemons = createAsyncThunk(
  'battleAI/fetchAIPokemons',
  async (type: string, thunkAPI) => {
    try {
      let idArray: number[];
      if (type === 'easy') idArray = getRandomIds(easyTab, 3);
      else if (type === 'medium') idArray = getRandomIds(mediumTab, 3);
      else if (type === 'hard') idArray = getRandomIds(hardTab, 3);
      else if (type === 'master') idArray = getRandomIds(legendaryTab, 3);
      else return [];

      const requests = idArray.map(id => axios.get(`/pokemon/${id}`));
      const responses = await Promise.all(requests);
      return responses.map(r => r.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
