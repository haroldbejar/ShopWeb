import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
    updateCart: (state, action) => {
      const { id, type } = action.payload;
      if (type === "decrease") {
        const product = state.cart.find((item) => item.productId === id);
        if (product) {
          product.quantity -= 1;
          if (product.quantity === 0) {
            return state.cart.filter((item) => item.productId !== id);
          }
        }
      } else if (type === "remove") {
        return state.cart.filter((item) => item.productId !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
