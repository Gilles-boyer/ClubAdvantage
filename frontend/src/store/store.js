import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import offerReducer from './slices/offerSlice';
import committeeReducer from './slices/CommitteeSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    offer: offerReducer,
    committee : committeeReducer
  },
});
