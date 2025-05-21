import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCategory, displayCategories, createCategory, updateCategory } from "../../services/categoryService";

const initialState = {
  list: [],
  status: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await displayCategories();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategoryThunk = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, thunkAPI) => {
    try {
      const response = await createCategory(categoryData);
      return response.data.data;
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);

    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateCategory(id, data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  'categories/deleteCategory',
  async (id, thunkAPI) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map(cat =>
          cat.id === updated.id ? updated : cat);
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((cat) => cat.id !== action.payload);
      })

  },
});

export const listOfCategories = (state) => state.category.list
export default categorySlice.reducer
