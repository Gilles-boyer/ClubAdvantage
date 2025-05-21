import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { displayOffers, createOffer, updateOffer, deleteOffer } from "../../services/offersService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async (_, thunkAPI) => {
    try {
      const response = await displayOffers();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addOfferThunk = createAsyncThunk(
  'offers/addOffer',
  async (offerData, thunkAPI) => {
    try {
      const response = await createOffer(offerData);
      return response.data.data;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const updateOfferThunk = createAsyncThunk(
  'offers/updateOffer',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateOffer(id, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteOfferThunk = createAsyncThunk(
  'offers/deleteOffer',
  async (id, thunkAPI) => {
    try {
      await deleteOffer(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOfferThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateOfferThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map(off =>
          off.id === updated.id ? updated : off);
      })
      .addCase(deleteOfferThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((of) => of.id !== action.payload);
      })

  },
});

export const listOfOffers = (state) => state.offer.list
export default offerSlice.reducer
