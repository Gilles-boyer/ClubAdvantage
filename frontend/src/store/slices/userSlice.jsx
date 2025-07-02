import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayUsers, createUser, updateUser, deleteUser} from "../../services/usersService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await displayUsers();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addUserThunk = createAsyncThunk(
  'users/addUser',
  async (userData, thunkAPI) => {
    try {
      const response = await createUser(userData);
      // console.log("Réponse à l'ajout", response.data.user);

      return response.data.user;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateUser(id, data);
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (id, thunkAPI) => {
    try {
      await deleteUser(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map(us =>
          us.id === updated.id ? updated : us);
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((us) => us.id !== action.payload);
      })

  },
});

export const listOfUsers = (state) => state.user.list
export default userSlice.reducer
