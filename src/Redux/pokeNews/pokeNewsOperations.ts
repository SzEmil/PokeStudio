import { createAsyncThunk } from '@reduxjs/toolkit';
import { fireDatabase } from '../../firebase';
import { push, ref, get, remove } from 'firebase/database';
import { post } from './pokeNewsSlice';

export const fetchPosts = createAsyncThunk(
  'pokeNews/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const snapshot = await get(ref(fireDatabase, 'posts'));

      if (snapshot.exists()) {
        const posts: post[] = snapshot.val();
        return Object.values(posts);
      } else {
        return [];
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  'pokeNews/addPost',
  async (post: post, thunkAPI) => {
    try {
      push(ref(fireDatabase, 'posts'), post)
        .then(() => {
          console.log('Post added to the database');
        })
        .catch(error => {
          console.error('Error adding post to the database:', error);
        });
      return post;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'pokeNews/deletePost',
  async (postId: string | number, thunkAPI) => {
    try {
      await remove(ref(fireDatabase, `posts/${postId}`));
      console.log('Post deleted from the database');
      return postId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
