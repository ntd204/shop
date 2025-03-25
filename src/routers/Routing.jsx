import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import DetailProduct from "../pages/Product";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Product from "../pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/product:id", element: <DetailProduct /> },
      { path: "/cart", element: <Cart /> },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
export default router;
