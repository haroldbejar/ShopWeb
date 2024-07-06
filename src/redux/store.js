import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import asideReducer from "./slices/asideSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    aside: asideReducer,
  },
});

export default store;
