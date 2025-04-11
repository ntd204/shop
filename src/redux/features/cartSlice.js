import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { cartItems } = state;
      const { payload } = action;
      const isCheckQuantity = cartItems.some((item) => item.id === payload.id);
      if (isCheckQuantity) {
        const updateCarts = cartItems.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });
        return {
          ...state,
          cartItems: updateCarts,
        };
      }
      return {
        ...state,
        cartItems: [...cartItems, payload],
      };
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
