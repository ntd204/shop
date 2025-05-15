import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const requireAuth = (action) => {
    if (isLogin) {
      action();
    } else {
      navigate("/login");
    }
  };
  const requireWishList = (action) => {
    if (isLogin) {
      action();
    } else {
      navigate("/login");
    }
  };
  const requireCartItem = (action) => {
    if (isLogin) {
      action();
    } else {
      navigate("/login");
    }
  };
  return { requireAuth, requireWishList, requireCartItem };
};
export default useAuth;
