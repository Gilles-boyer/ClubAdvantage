import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStats } from "../../services/statsService";

export const fetchStatsThunk = createAsyncThunk(
  "stats/fetch",
  async () => {
    const { data } = await fetchStats();
    return data; // { cseActifs, offresActives, … }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    data: null,       // on stocke ici le payload
    status: "idle",   // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchStatsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.data = null;
      })
      .addCase(fetchStatsThunk.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload;    // on écrit bien dans `data`
      })
      .addCase(fetchStatsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

export const selectStats = (state) => state.stats.data;
export const selectStatsStatus = (state) => state.stats.status;
export const selectStatsError = (state) => state.stats.error;

export default statsSlice.reducer;
