import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authService from '../../services/authService'

const initialState = {
    user   : null,
    status : 'idle',      // idle | loading | succeeded | failed
    error  : null,
}

/* 1)  Recharger l’utilisateur grâce au cookie Sanctum           */
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const { data } = await authService.me()
            return data.data?.user ?? data.user ?? null
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

/* 2)  Login  + token (création de la session)                   */
export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await authService.login(credentials)

            /* 🆕 — optionnel : afficher la réponse du login ---------- */
            console.log('✅  Login OK :', data)

            return data.user
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

/* 3)  Logout (destruction de la session)                        */
export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

/* Slice Redux                                                  */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /* FETCH CURRENT --------------------------------------------------- */
        builder
        .addCase(fetchCurrentUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
            state.status = 'succeeded'
            state.user   = payload          // devient null si rejectWithValue(null)
        })
        .addCase(fetchCurrentUser.rejected, (state) => {
            //console.info('Pas de session — c’est normal si on arrive sur /login');
            state.status = 'idle';
            state.user   = null;          // on ne met PAS d'erreur bloquante
        })

        /* LOGIN --------------------------------------------------------- */
        .addCase(loginThunk.pending, (state) => {
            state.status = 'loading'
            state.error  = null
        })
        .addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.status = 'succeeded'
            state.user   = payload
        })
        .addCase(loginThunk.rejected, (state, { payload }) => {
            state.status = 'failed'
            state.error  = payload
        })

        /* LOGOUT -------------------------------------------------------- */
        .addCase(logoutThunk.fulfilled, (state) => {
            state.user   = null
            state.status = 'idle'
        })
    },
})

export const selectAuth = (state) => state.auth
export default authSlice.reducer

