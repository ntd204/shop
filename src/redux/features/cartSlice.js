import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cart = createSlice({
  name: "cart",
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
        state.cartItems = updateCarts;
      } else {
        state.cartItems = [...cartItems, payload];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    reduceCart: (state, action) => {
      const { cartItems } = state;
      const { payload } = action;
      if (payload.cartItem > 1) {
        const updateCarts = cartItems.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              cartItem: product.cartItem - 1,
            };
          }
          return product;
        });
        state.cartItems = updateCarts;
      } else {
        const updateCarts = cartItems.filter((item) => item.id !== payload.id);
        state.cartItems = updateCarts;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    setCartItemsFromStorage: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    clearCartItems: (state) => {
      (state.cartItems = []), localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  reduceCart,
  updateQuantity,
  setCartItemsFromStorage,
  clearCartItems,
} = cart.actions;
export default cart.reducer;
