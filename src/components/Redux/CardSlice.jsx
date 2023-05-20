import { createSlice } from '@reduxjs/toolkit';
import { fetchCardUpdate, fetchGetCard } from './Options';

const CardSlice = createSlice({
  name: 'card',
  initialState: { card: [], isLoading: false, error: null },
  reducers: {
    users: (state, action) => [...state, action.payload],
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGetCard.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchGetCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.card = action.payload;
      })
      .addCase(fetchGetCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCardUpdate.fulfilled, (state, action) => {
        state.card.push(action.payload);
        state.error = null;
      })
      .addCase(fetchCardUpdate.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { card } = CardSlice.actions;
export const cardReducer = CardSlice.reducer;
