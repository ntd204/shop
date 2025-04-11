import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import wishListSlice from "./features/wishListSlice";

const reducer = combineReducers({ cartSlice, wishListSlice });
const store = configureStore({
  reducer,
});
export default store;
