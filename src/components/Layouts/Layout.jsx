import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
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
