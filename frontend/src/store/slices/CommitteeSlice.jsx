import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCommittee, displayCommittees, createCommittee, updateCommittee} from "../../services/committeeService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchCmmtts = createAsyncThunk(
  'categories/fetchCmmtts',
  async (_, thunkAPI) => {
    try {
      const response = await displayCommittees();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCmmttThunk = createAsyncThunk(
  'categories/addCmmtt',
  async (categoryData, thunkAPI) => {
    try {
      const response = await createCommittee(categoryData);
      return response.data.data;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const updateCmmttThunk = createAsyncThunk(
  'categories/updateCmmtt',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateCommittee(id, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCmmttThunk = createAsyncThunk(
  'categories/deleteCmmtt',
  async (id, thunkAPI) => {
    try {
      await deleteCommittee(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const committeeSlice = createSlice({
  name: 'committee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCmmtts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCmmtts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCmmtts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCmmttThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCmmttThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map(cat =>
          cat.id === updated.id ? updated : cat);
      })
      .addCase(deleteCmmttThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat.id !== action.payload);
      })

  },
});

export const listOfCommittees = (state) => state.category.list
export default committeeSlice.reducer
