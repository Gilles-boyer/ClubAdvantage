import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await authService.login(credentials);
            return data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout();
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(loginThunk.pending, state => {
            state.status = 'loading';
            state.error  = null;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user   = action.payload;
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error  = action.payload;
        })
        .addCase(logoutThunk.fulfilled, state => {
            state.user   = null;
            state.status = 'idle';
        });
    },
});

export const selectAuth = state => state.auth;
export default authSlice.reducer;
