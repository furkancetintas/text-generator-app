import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchText = createAsyncThunk(
  'text/asyncFetchText',
  async (paras, format) => {
    const res = await axios(
      `https://baconipsum.com/api/?type=all-meat&paras=${paras}&format=${format}`
    );
    return res.data;
  }
);

export const textsSlice = createSlice({
  name: 'text',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchText.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchText.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchText.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default textsSlice.reducer;
