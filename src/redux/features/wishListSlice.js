import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishLists: [],
};

export const wishListSlice = createSlice({
  name: "wishListSlice",
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
        return {
          ...state,
          wishLists: updateWishList,
        };
      }
      return {
        ...state,
        wishLists: [...wishLists, payload],
      };
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
        return {
          ...state,
          wishLists: updateWishList,
        };
      } else {
        const updateWishList = wishLists.filter(
          (item) => item.id !== payload.id
        );
        return {
          ...state,
          wishLists: updateWishList,
        };
      }
    },
  },
});
export const { addToWishList, reduceWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
