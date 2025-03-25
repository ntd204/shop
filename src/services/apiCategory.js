import axios from "axios";
import { API_ALL_CATEGORY } from "../utils/constants/getApi";

const apiCategory = {
  getAllCategory: async () => {
    return await axios.get(API_ALL_CATEGORY);
  },
};
export default apiCategory;
