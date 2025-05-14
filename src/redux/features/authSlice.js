import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const initialState = {
  userName: localStorage.getItem("userName") || "",
  isLogin: !!localStorage.getItem("userName"),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doLogin: (state, action) => {
      const { email, password } = action.payload;
      if (email === "dao@gmail.com" && password === "123456") {
        const userName = email.split("@")[0];
        const savedWishList = localStorage.getItem("wishList");
        localStorage.setItem("userName", userName);
        localStorage.setItem("wishList", savedWishList || JSON.stringify([]));
        return {
          ...state,
          userName,
          isLogin: true,
        };
      } else {
        toast.error("Fail login");
        return {
          ...state,
          userName: "",
          isLogin: false,
        };
      }
    },
    doLogout: (state) => {
      localStorage.removeItem("userName");
      localStorage.removeItem("wishList");

      return {
        ...state,
        userName: "",
        isLogin: false,
      };
    },
  },
});
export const { doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;
