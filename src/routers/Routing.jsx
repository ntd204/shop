import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import DetailProduct from "../pages/Public/DetailProduct";
import Login from "../pages/Public/Login";
import Cart from "../pages/Private/Cart";
import Profile from "../pages/Private/Profile";
import Home from "../pages/Public/Home";
import Product from "../pages/Public/Product";
import WishList from "../pages/Private/WishList";
import CheckOut from "../pages/Private/CheckOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/detail-product/:id", element: <DetailProduct /> },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "/checkout", element: <CheckOut /> },
    ],
  },
]);
export default router;
