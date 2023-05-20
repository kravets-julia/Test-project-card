import { createSlice } from '@reduxjs/toolkit';

const followerSlice = createSlice({
  name: 'followers',
  initialState: '',
  reducers: {
    getFollowers: (state, action) => action.payload,
  },
});

export const { getFollowers } = followerSlice.actions;
export const followerReducer = followerSlice.reducer;
