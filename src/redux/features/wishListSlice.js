import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishLists: [],
};

export const wishList = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const { wishLists } = state;
      const { payload } = action;
      const isCheckWishList = wishLists.some((item) => item.id === payload.id);
      if (isCheckWishList) {
        const updateWishList = wishLists.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              wishList: product.wishList + 1,
            };
          }
          return product;
        });
        state.wishLists = updateWishList;
      } else {
        state.wishLists = [...wishLists, payload];
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishLists));
    },
    reduceWishList: (state, action) => {
      const { wishLists } = state;
      const { payload } = action;
      if (payload.wishList > 1) {
        const updateWishList = wishLists.map((product) => {
          if (product.id === payload.id) {
            return {
              ...product,
              wishList: product.wishList - 1,
            };
          }
          return product;
        });
        state.wishLists = updateWishList;
      } else {
        const updateWishList = wishLists.filter(
          (item) => item.id !== payload.id
        );
        state.wishLists = updateWishList;
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishLists));
    },
    setWishListFromStorage: (state, action) => {
      state.wishLists = action.payload;
      localStorage.setItem("wishList", JSON.stringify(action.payload));
    },
    clearWishList: (state) => {
      (state.wishLists = []), localStorage.removeItem("wishList");
    },
  },
});
export const {
  addToWishList,
  reduceWishList,
  setWishListFromStorage,
  clearWishList,
} = wishList.actions;
export default wishList.reducer;
