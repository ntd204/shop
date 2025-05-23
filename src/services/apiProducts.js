import axios from "axios";
import {
  API_ALL_PRODUCTS,
  API_GET_DETAIL_PRODUCT,
  API_GET_PRODUCT_BY_A_CATEGORY,
} from "../utils/constants/getApi";

const apiProducts = {
  getAllProducts: async (params) => {
    return await axios.get(`${API_ALL_PRODUCTS}/search?`, { params });
  },
  getDataDetailProducts: async (id) => {
    return await axios.get(`${API_GET_DETAIL_PRODUCT}/${id}`);
  },
  getDataProductsByCategory: async (category) => {
    return await axios.get(`${API_GET_PRODUCT_BY_A_CATEGORY}/${category}`);
  },
};
export default apiProducts;
