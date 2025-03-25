import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="bg-gray-200">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
