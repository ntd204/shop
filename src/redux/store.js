import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./features/cartSlice";
import wishList from "./features/wishListSlice";
import auth from "./features/authSlice";

const reducer = combineReducers({ cart, wishList, auth });
const store = configureStore({
  reducer,
});
export default store;
