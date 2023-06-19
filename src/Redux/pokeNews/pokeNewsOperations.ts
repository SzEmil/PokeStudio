import { createAsyncThunk } from "@reduxjs/toolkit";
import { fireDatabase } from "../../firebase";
import { push, ref } from "firebase/database";

const post = {
    title: 'Example Title',
    description: 'Example Description',
    imageLink: 'https://example.com/image.jpg'
  };

export const addPost = createAsyncThunk(
    'pokeNews/addPost',
    async (_, thunkAPI) => {
      try {

        push(ref(fireDatabase, 'posts'), post)
        .then(() => {
          console.log('Post added to the database');
        })
        .catch(error => {
          console.error('Error adding post to the database:', error);
        });
        return {};
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );