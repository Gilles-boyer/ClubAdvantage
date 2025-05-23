import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCommittee, displayCommittees, createCommittee, updateCommittee} from "../../services/committeeService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchCmmtts = createAsyncThunk(
  'committees/fetchCmmtts',
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
  'committees/addCmmtt',
  async (committeeData, thunkAPI) => {
    try {
      const response = await createCommittee(committeeData);
      return response.data.data;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const updateCmmttThunk = createAsyncThunk(
  'committees/updateCmmtt',
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
  'committees/deleteCmmtt',
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
        state.list = state.list.map(com =>
          com.id === updated.id ? updated : com);
      })
      .addCase(deleteCmmttThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((com) => com.id !== action.payload);
      })

  },
});

export const listOfCommittees = (state) => state.committee.list
export default committeeSlice.reducer
