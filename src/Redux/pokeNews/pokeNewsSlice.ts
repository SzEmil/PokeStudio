import { createSlice } from '@reduxjs/toolkit';
import { addPost, deletePost } from './pokeNewsOperations';
import { fetchPosts } from './pokeNewsOperations';

export type post = {
  title: string | null;
  message: string;
  imgLink: string;
  id: string | number;
  author: string | undefined | null;
};

export type initialStateType = {
  posts: post[];
  isLoading: boolean;
  error: any;
};
const pokeNewsInitialState: initialStateType = {
  posts: [],
  isLoading: false,
  error: null,
};

const pokeNewsSlice = createSlice({
  name: 'pokeNews',
  initialState: pokeNewsInitialState,
  reducers: {
    importData: state => state,
  },
  extraReducers(builder) {
    builder.addCase(addPost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = [action.payload, ...state.posts];
    });

    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });

    builder.addCase(deletePost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = state.posts.filter(post => post.id !== action.payload);
    });
  },
});

export const { importData } = pokeNewsSlice.actions;
export const pokeNewsReducer = pokeNewsSlice.reducer;
