import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayProfil, updateProfil, deleteProfil } from "../../services/profilService";

const initialState = {
    profil: {},
    status: null,
    loading: false,
    error: null,
};

export const fetchProfil = createAsyncThunk(
    'profil/fetchProfil',
    async (_, thunkAPI) => {
        try {
            const response = await displayProfil()
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateProfilThunk = createAsyncThunk(
    'profil/updateProfil',
    async ({ data }, thunkAPI) => {
        try {
            const response = await updateProfil(data);
            return response.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteProfilThunk = createAsyncThunk(
    'profil/deleteProfil',
    async (thunkAPI) => {
        try {
            await deleteProfil();
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const profilSlice = createSlice({
    name: 'profil',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfil.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfil.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                console.log('Datas :',action.payload);
                state.profil= action.payload;

            })
            .addCase(updateProfilThunk.fulfilled, (state, action) => {
                state.profil = action.payload
            })
            .addCase(deleteProfilThunk.fulfilled, (state) => {
                state.profil = [];
            })

    },
});

export const currentProfil = (state) => state.profil
export default profilSlice.reducer
