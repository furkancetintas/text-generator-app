import { configureStore } from '@reduxjs/toolkit';
import textsSlice from './TextSlice/textsSlice';

export const store = configureStore({
  reducer: {
    text: textsSlice,
  },
});
