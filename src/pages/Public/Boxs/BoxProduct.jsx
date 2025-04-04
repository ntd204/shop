import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Skeleton } from "@mui/material";

const BoxProduct = ({ item, idx }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  });
  return isLoading ? (
    <li
      key={idx}
      className="relative border bg-white border-none rounded-xl font-semibold text-center hover:scale-105 overflow-hidden group"
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-600 text-white rounded-xl ">
        -{item.discountPercentage}%
      </span>
      <button
        className="absolute bottom-30 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite((prev) => !prev);
        }}
      >
        {isFavorite ? (
          <IoIosHeart className="text-red-500 size-7" />
        ) : (
          <IoIosHeartEmpty className=" size-7" />
        )}
      </button>
      <Link>
        <img src={item.thumbnail} className="w-full" />
      </Link>
      <p className="flex flex-col justify-center items-center">
        <h3 className="text-15 mt-2">Title: {item.title}</h3>
        <span className="text-red-500 group-hover:hidden">
          Price: {item.price}$
        </span>
        <button className="hover:underline hidden group-hover:block uppercase">
          Add to cart
        </button>
      </p>
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
