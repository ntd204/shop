import React from "react";

import { Link, NavLink } from "react-router-dom";
import { Logo, User } from "../../utils/Images";

const Header = () => {
  const listMenu = [
    { tittle: "Home", to: "/" },
    { tittle: "Product", to: "/product" },
    { tittle: "Cart", to: "/cart" },
    { tittle: "Profile", to: "/profile" },
  ];
  return (
    <div className="flex justify-evenly h-[70px] bg-[#f2f2f2] shadow-2xl">
      <Link className="block max-w-[130px] " to={"/"}>
        <img className="max-w-full" src={Logo} alt="logo" />
      </Link>
      <ul className="flex gap-10 justify-center items-center font-bold">
        {listMenu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {item.tittle}
          </NavLink>
        ))}
      </ul>
      <Link
        to={"/login"}
        className="flex justify-center items-center font-bold gap-2"
      >
        Login
        <img src={User} className="w-4" alt="user" />
      </Link>
    </div>
  );
};

export default Header;
