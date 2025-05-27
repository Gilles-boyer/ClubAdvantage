import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayRoles, createRole, updateRole, deleteRole } from "../../services/rolesService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (_, thunkAPI) => {
    try {
      const response = await displayRoles();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRoleThunk = createAsyncThunk(
  'roles/addRole',
  async (roleData, thunkAPI) => {
    try {
      const response = await createRole(roleData);
      return response.data.data;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const updateRoleThunk = createAsyncThunk(
  'roles/updateRole',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateRole(id, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteRoleThunk = createAsyncThunk(
  'roles/deleteRole',
  async (id, thunkAPI) => {
    try {
      await deleteRole(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRoleThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateRoleThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map(r =>
          r.id === updated.id ? updated : r);
      })
      .addCase(deleteRoleThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r.id !== action.payload);
      })

  },
});

export const listOfRoles = (state) => state.role.list
export default roleSlice.reducer
