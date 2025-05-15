import { useEffect, useState } from "react";
import apiProducts from "../services/apiProducts";

const useFetchDataProduct = (category, filterParams) => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  useEffect(() => {
    const fetchDataProductsByCategory = async () => {
      const res = await apiProducts.getDataProductsByCategory(category);
      if (res.status === 200) {
        setProducts(res.data.products);
      }
    };
    const fetchDataAllProducts = async () => {
      const res = await apiProducts.getAllProducts(filterParams);
      if (res.status === 200) {
        setProducts(res.data.products);
        setTotalProduct(res.data.total);
      }
    };
    if (category) {
      fetchDataProductsByCategory();
    } else {
      fetchDataAllProducts();
    }
  }, [category, filterParams]);
  return { products, totalProduct };
};

export default useFetchDataProduct;
