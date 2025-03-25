import React, { useEffect, useState } from "react";
import apiProducts from "../services/apiProducts";
import BannerTopProduct from "./Banner/BannerTopProduct";
import SideBar from "./SideBar";

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchGetAllProducts = async () => {
      const res = await apiProducts.getAllProducts();
      if (res.status === 200) {
        setProducts(res.data.products);
      }
    };
    fetchGetAllProducts();
  }, []);
  return (
    <>
      <BannerTopProduct />
      <section className="pt-12 pb-12">
        <div className="container">
          <div className="grid grid-cols-5">
            <div className="col-span-1 p-4">
              <div>
                <h2 className="text-lg font-semibold">Categories</h2>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
