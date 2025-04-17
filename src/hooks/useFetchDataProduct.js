import { useEffect, useState } from "react";
import apiProducts from "../services/apiProducts";

const useFetchDataProduct = (category) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log(category);
    const fetchGetAllProducts = async () => {
      const res = await apiProducts.getDataProductsByCategory(category);
      if (res.status === 200) {
        setProducts(res.data.products);
      }
      console.log("res", res);
    };
    if (category) {
      fetchGetAllProducts();
    }
  }, [category]);
  console.log(products, "products");
  return { products };
};

export default useFetchDataProduct;
