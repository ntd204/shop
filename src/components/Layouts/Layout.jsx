import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishListFromStorage } from "../../redux/features/wishListSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const saveWishList = localStorage.getItem("wishList");
    if (saveWishList) {
      dispatch(setWishListFromStorage(JSON.parse(saveWishList)));
    }
  }, []);
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
