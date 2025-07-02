import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { fetchUser }from '../../services/authService'
const initialState = {
    authUser   : null,
    status : null,  
    error  : null,
}


export const fetchAuthUser = createAsyncThunk(
    'auth/fetchAuthtUser',
    async (_, thunkAPI) => {
        try {
            const response = await fetchUser()
            // console.log('RESPONSE DANS LE THUNK =>', response);
            
            return response;
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAuthUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAuthUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.authUser = action.payload 
        })
        .addCase(fetchAuthUser.rejected, (state, action) => {
            state.status = 'failed';
            state.authUser   = action.payload;        
        })
    },
})

export const selectAuth = (state) => state.auth.authUser
export default authSlice.reducer