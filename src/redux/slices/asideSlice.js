import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endPoints from "../../endpoints/endPoint";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const url = `${endPoints.category.list}/1/10`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const asideSlice = createSlice({
  name: "aside",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories.$values;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default asideSlice.reducer;
