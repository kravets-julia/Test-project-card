import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInfo } from 'components/Fetch/Fetch';
import { updateFetchCard } from 'components/Fetch/UpdateFetchCard';

export const fetchGetCard = createAsyncThunk(
  'card/fetchGetCard',
  async (_, thunkAPI) => {
    try {
      const response = await fetchInfo();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCardUpdate = createAsyncThunk(
  'card/fetchCardUpdate',
  async (data, thunkAPI) => {
    try {
      const response = await updateFetchCard(data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
