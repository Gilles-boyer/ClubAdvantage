import {configureStore} from '@reduxjs/toolkit';
import categoryReducer  from './slices/categorySlice';
import offerReducer     from './slices/offerSlice';
import committeeReducer from './slices/committeeSlice';
import userReducer      from './slices/userSlice'
import roleReducer      from './slices/rolesSlice'
import scanReducer      from './slices/scanSlice'
import profilReducer    from './slices/profilSlice'
import authReducer      from './slices/authSlice.jsx';
import statsReducer     from './slices/statsSlice.jsx';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        offer: offerReducer,
        committee : committeeReducer,
        user: userReducer,
        role: roleReducer,
        scan: scanReducer,
        profil: profilReducer,
        auth: authReducer,
        stats: statsReducer,
    },
});
