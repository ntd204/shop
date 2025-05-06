import React from "react";

import { Link, NavLink } from "react-router-dom";
import { Cart, Heart, Logo, User } from "../../utils/Images";
import { useSelector } from "react-redux";
import AccountMenu from "../../pages/Private/AccountMenu";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishLists = useSelector((state) => state.wishList.wishLists);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const listMenu = [
    { tittle: "Home", to: "/" },
    { tittle: "Product", to: "/product" },
    { tittle: "Cart", to: "/cart" },
  ];
  return (
    <div className="flex justify-evenly h-[70px] bg-[#f2f2f2] shadow-2xl ">
      <Link className="block max-w-[130px] " to={"/"}>
        <img className="max-w-full" src={Logo} alt="logo" />
      </Link>
      <ul className="flex gap-10 justify-center items-center font-bold">
        {listMenu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold text-lg"
                : "text-black hover:text-red-500"
            }
          >
            {item.tittle}
          </NavLink>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-5">
        {isLogin ? (
          <Link to={"/"} /> && <AccountMenu />
        ) : (
          <Link
            to={"/login"}
            className="flex justify-center items-center font-bold gap-2 hover:text-red-500"
          >
            Login
            <img src={User} className="w-6" alt="user" />
          </Link>
        )}
        <Link to={"/cart"} className="relative">
          <img src={Cart} className="w-7" />
          <span className="flex items-center justify-center absolute -top-1 -right-1.5 bg-black rounded-full w-5 text-white text-sm">
            {cartItems.length}
          </span>
        </Link>
        <Link to={"/wishList"} className="relative">
          <img src={Heart} className="w-6" />
          <span className="flex items-center justify-center absolute -top-1.5 -right-1.5 bg-black rounded-full w-5 text-white text-sm">
            {wishLists.length}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
