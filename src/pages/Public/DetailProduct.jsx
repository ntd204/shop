import React, { useEffect, useState } from "react";
import apiProducts from "../../services/apiProducts";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToWishList,
  reduceWishList,
} from "../../redux/features/wishListSlice";
import { toast } from "react-toastify";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { addToCart } from "../../redux/features/cartSlice";

const DetailProduct = ({ item }) => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState(0);

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
      })
    );
    toast.success("Thêm vào giỏ hàng thành công!", {
      progress: undefined,
      autoClose: 1000,
    });
  };
  const handleAddToWishList = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
    if (isFavorite) {
      dispatch(
        reduceWishList({
          ...item,
          wishList: 1,
        })
      );
      toast.success("Xóa khỏi danh sách yêu thích thành công!", {
        progress: undefined,
        autoClose: 1000,
      });
    } else {
      toast.success("Thêm vào danh sách yêu thích thành công!", {
        progress: undefined,
        autoClose: 1000,
      });
      dispatch(
        addToWishList({
          ...item,
          wishList: 1,
        })
      );
    }
  };
  useEffect(() => {
    if (id) {
      const fetchDataDetailProduct = async () => {
        const res = await apiProducts.getDataDetailProducts(id);
        console.log("res", res);
        if (res.status === 200) {
          setProducts(res.data);
        }
      };
      fetchDataDetailProduct();
    }
  }, []);
  console.log("product", product);
  return (
    <div>
      <div className="flex justify-around p-5">
        <div className="flex flex-col justify-center items-center">
          <img src={product.thumbnail} className="size-80" />
          <p className="border rounded-xl overflow-hidden">
            <img
              src={product.images}
              className="size-25  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-150"
            />
          </p>
          <p className="bg-blue-200"></p>
        </div>
        <div className="flex flex-col justify-center gap-5 max-w-1/2">
          <p className="font-semibold text-xl">
            Name:
            <span className="font-semibold text-xl pl-2">{product.title}</span>
          </p>
          <p className="font-semibold text-xl">
            Brand:
            <span className="font-semibold text-xl pl-2">{product.brand}</span>
          </p>
          <p className="font-semibold text-xl">
            Category:
            <span className="font-semibold text-xl pl-2">
              {product.category}
            </span>
          </p>
          <p className="font-semibold text-xl">
            Description:
            <span className="font-semibold text-xl pl-2">
              {product.description}
            </span>
          </p>
          <p className="font-semibold text-xl">
            Price:
            <span className="font-semibold text-xl text-red-500 pl-2">
              {product.price}$
            </span>
          </p>
          <div className="flex justify-between">
            <p className="flex justify-center items-center gap-2 border rounded-2xl w-[100px]">
              <button
                className="text-xl cursor-pointer"
                onClick={() => setQuantityProduct(() => quantityProduct - 1)}
                disabled={quantityProduct <= 0}
              >
                -
              </button>
              <span>{quantityProduct}</span>
              <button
                className="text-xl cursor-pointer"
                onClick={() => setQuantityProduct(() => quantityProduct + 1)}
              >
                +
              </button>
            </p>
            <p className="w-[500px]">
              <button
                className=" justify-center mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300 w-full"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </p>

            <button
              className="group-hover:opacity-100 transition-opacity duration-300 "
              onClick={(e) => handleAddToWishList(e)}
            >
              {isFavorite ? (
                <IoIosHeart className="text-red-500 size-7" />
              ) : (
                <IoIosHeartEmpty className=" size-7" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
