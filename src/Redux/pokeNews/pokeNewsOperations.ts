import { createAsyncThunk } from '@reduxjs/toolkit';
import { fireDatabase } from '../../firebase';
import { push, ref, get, set } from 'firebase/database';
import { post } from './pokeNewsSlice';

export const fetchPosts = createAsyncThunk(
  'pokeNews/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const snapshot = await get(ref(fireDatabase, 'posts'));

      if (snapshot.exists()) {
        const posts: post[] = snapshot.val();
        const postsArr = Object.values(posts);
        const postsforDisplay = postsArr.reverse().slice(0, 10);
        return postsforDisplay;
      } else {
        return [];
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMorePosts = createAsyncThunk(
  'pokeNews/loadMorePosts',
  async (n: number, thunkAPI) => {
    try {
      const snapshot = await get(ref(fireDatabase, 'posts'));

      if (snapshot.exists()) {
        const posts: post[] = snapshot.val();
        const postsArr = Object.values(posts);
        const postsforDisplay = postsArr.reverse().slice(n, n + 10);
        return postsforDisplay;
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
      await push(ref(fireDatabase, 'posts'), post);
      return post;
    } catch (error: any) {
      console.error('Error adding post to the database:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'pokeNews/deletePost',
  async (postId: string | number, thunkAPI) => {
    try {
      const postsRef = ref(fireDatabase, 'posts');
      const snapshot = await get(ref(fireDatabase, 'posts'));
      if (snapshot.exists()) {
        const posts: post[] = snapshot.val();

        const postsArr = Object.values(posts);
        const filteredPosts = postsArr.filter(post => post.id !== postId);
        await set(postsRef, filteredPosts);
      }
      console.log('Post deleted from the database');
      return postId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
