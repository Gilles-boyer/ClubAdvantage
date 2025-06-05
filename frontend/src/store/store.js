import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import offerReducer from './slices/offerSlice';
import committeeReducer from './slices/CommitteeSlice';
import userReducer from './slices/userSlice'
import roleReducer from './slices/rolesSlice'
import scanReducer from './slices/scanSlice'
import profilReducer from './slices/profilSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    offer: offerReducer,
    committee : committeeReducer,
    user: userReducer,
    role: roleReducer,
    scan: scanReducer,
    profil: profilReducer
  },
});
