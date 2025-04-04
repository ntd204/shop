import { useEffect, useState } from "react";
import apiCategory from "../services/apiCategory";

const useFetchGetDataAllCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchDataCategory = async () => {
      const res = await apiCategory.getAllCategory();
      if (res.data.length > 0) {
        setCategories(res.data);
      }
    };
    fetchDataCategory();
  }, []);
  return { categories };
};
export default useFetchGetDataAllCategory;
