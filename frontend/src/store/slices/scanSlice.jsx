import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayScans, deleteScan, createScan } from "../../services/scansService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchScans = createAsyncThunk(
  'scans/fetchScans',
  async (_, thunkAPI) => {
    try {
      const response = await displayScans();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addScanThunk = createAsyncThunk(
  'scans/addScan',
  async (datas, thunkAPI) => {
    try {
      const response = await createScan(datas);
      return response.data.data;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const deleteScanThunk = createAsyncThunk(
  'scans/deleteScan',
  async (id, thunkAPI) => {
    try {
      await deleteScan(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScans.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchScans.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addScanThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteScanThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((scan) => scan.id !== action.payload);
      })

  },
});

export const listOfScans = (state) => state.scan.list
export default scanSlice.reducer
