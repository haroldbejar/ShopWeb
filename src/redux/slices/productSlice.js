import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endPoints from "../../endpoints/endPoint";
import axios from "axios";

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page) => {
    const url = `${endPoints.product.list}/${page}/10`;
    const response = await axios.get(url);
    return response.data;
  }
);

const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId) => {
    const page = 1;
    const url = `${endPoints.product.listByCategory}/${categoryId}/${page}/10`;
    const response = await axios.get(url);
    return response.data;
  }
);

const initialState = {
  items: [],
  paginationObj: {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
  },
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list all
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products.$values;
        state.paginationObj = action.payload.paginationData || {
          totalCount: 0,
          pageSize: 10,
          currentPage: 1,
          totalPages: 1,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.productsCategory.$values;
        state.paginationObj = action.payload.paginationData || {
          totalCount: 0,
          pageSize: 10,
          currentPage: 1,
          totalPages: 1,
        };
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchProducts, fetchProductsByCategory };
export default productSlice.reducer;
