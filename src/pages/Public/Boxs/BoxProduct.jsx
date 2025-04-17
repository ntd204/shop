import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { toast } from "react-toastify";
import {
  addToWishList,
  reduceWishList,
} from "../../../redux/features/wishListSlice";

const BoxProduct = ({ item, idx }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  });
  return isLoading ? (
    <li
      key={idx}
      className="relative border bg-white border-none rounded-xl font-semibold text-center hover:scale-105 overflow-hidden group"
      onClick={() => navigate(`/detail-product/${item.id}`)}
    >
      <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-600 text-white rounded-xl ">
        -{item.discountPercentage}%
      </span>
      <button
        className="absolute bottom-30 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
        onClick={(e) => handleAddToWishList(e)}
      >
        {isFavorite ? (
          <IoIosHeart className="text-red-500 size-7" />
        ) : (
          <IoIosHeartEmpty className=" size-7" />
        )}
      </button>
      <Link to={"/detail-product/:id"}>
        <img src={item.thumbnail} className="w-full" />
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-15 mt-2">Title: {item.title}</h3>
        <span className="text-red-500 group-hover:hidden">
          Price: {item.price}$
        </span>
        <button
          className="hover:underline hidden group-hover:block uppercase absolute bottom-1"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </li>
  ) : (
    <li className="mt-6 md:mt-0 text-center group relative">
      <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </div>
    </li>
  );
};

export default BoxProduct;
