import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import offerReducer from './slices/offerSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    offer: offerReducer
  },
});
