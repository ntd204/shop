import { useDispatch, useSelector } from "react-redux";
import { addToWishList, reduceWishList } from "../redux/features/wishListSlice";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const useWishList = () => {
  const dispatch = useDispatch();
  const wishLists = useSelector((state) => state.wishList.wishLists);
  const { requireWishList } = useAuth();
  const isFavorite = (item) => {
    return wishLists.some((i) => i.id === item.id);
  };

  const toggleWishList = (item, e) => {
    requireWishList(() => {
      if (e) {
        e.stopPropagation();
      }
      if (isFavorite(item)) {
        dispatch(reduceWishList(item));
        toast.success("Xóa khỏi danh sách yêu thích thành công!", {
          autoClose: 1000,
        });
      } else {
        toast.success("Thêm vào danh sách yêu thích thành công!", {
          autoClose: 1000,
        });
        dispatch(addToWishList(item));
      }
    });
  };
  return { toggleWishList, isFavorite };
};
export default useWishList;
