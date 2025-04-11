import axios from "axios";
import {
  API_ALL_PRODUCTS,
  API_GET_DETAIL_PRODUCT,
} from "../utils/constants/getApi";

const apiProducts = {
  getAllProducts: async () => {
    return await axios.get(API_ALL_PRODUCTS);
  },
  getDataDetailProducts: async (id) => {
    return await axios.get(`${API_GET_DETAIL_PRODUCT}/${id}`);
  },
};
export default apiProducts;
