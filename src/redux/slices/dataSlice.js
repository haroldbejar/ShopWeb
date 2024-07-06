import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    requestData(state) {
      state.loading = true;
      state.error = null;
    },
    receiveData(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    receiveError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { requestData, receiveData, receiveError } = dataSlice.actions;
export const selectData = (state) => state.data;
