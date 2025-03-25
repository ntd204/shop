import axios from "axios";
import { API_ALL_PRODUCTS } from "../utils/constants/getApi";

const apiProducts = {
  getAllProducts: async () => {
    return await axios.get(API_ALL_PRODUCTS);
  },
};
export default apiProducts;
