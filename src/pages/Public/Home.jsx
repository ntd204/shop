import React, { useEffect, useState } from "react";
import BannerTopHome from "../Banner/BannerTopHome";
import SectionService from "./Sections/SectionService";
import SectionCategories from "./Sections/SectionCategories";
import apiProducts from "../../services/apiProducts";
import SectionBestSeller from "./Sections/SectionBestSeller";
import SectionNewArrivals from "./Sections/SectionNewArrivals";

const Home = () => {
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
    <div>
      <BannerTopHome />
      <SectionService />
      <SectionCategories />
      <SectionBestSeller products={products} />
      <SectionNewArrivals products={products} />
    </div>
  );
};

export default Home;
