import React, { useEffect, useRef, useState } from "react";
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
import SectionRelatesProduct from "./Sections/SectionRelatesProduct";
import _ from "lodash";
import useFetchDataProduct from "../../hooks/useFetchDataProduct";

const DetailProduct = () => {
  const { id } = useParams();
  const divRef = useRef(null);
  const [product, setProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [category, setCategory] = useState("");
  // const [productByCategory, setProductByCategory] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const { products } = useFetchDataProduct(category);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantityProduct,
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
          ...product,
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
          ...product,
          wishList: 1,
        })
      );
    }
  };
  useEffect(() => {
    if (id) {
      if (divRef.current) {
        divRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
      const fetchDataDetailProduct = async () => {
        const res = await apiProducts.getDataDetailProducts(id);
        if (res.status === 200) {
          setProducts(res.data);
          setCategory(res.data.category);
        }
      };
      fetchDataDetailProduct();
    }
  }, [id, divRef]);
  // useEffect(() => {
  //   const fetchDataProductsByCategory = async () => {
  //     const res = await apiProducts.getDataProductsByCategory(category);
  //     if (res.status === 200) {
  //       setProductByCategory(res.data.products);
  //     }
  //   };
  //   if (category) {
  //     fetchDataProductsByCategory();
  //   }
  // }, [category]);
  const handleChangeActiveImage = (index) => {
    setActiveImgIndex(index);
  };
  return (
    <div ref={divRef}>
      <div className="flex justify-around p-5">
        <div className="flex flex-col justify-center items-center">
          <img
            src={product?.images?.[activeImgIndex] || ""}
            className="size-80"
          />
          <ul className="flex justify-center items-center gap-2">
            {product?.images?.map((item, index) => (
              <li
                className={`cursor-pointer border-2 rounded-xl hover:border-blue-500 hover:border-2 overflow-hidden ${
                  activeImgIndex == index && "border-blue-500 border-2 "
                }`}
              >
                <img
                  src={item}
                  onClick={() => handleChangeActiveImage(index)}
                  className={` size-25  `}
                />
              </li>
            ))}
          </ul>
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
            <div className="flex items-center w-max relative cursor-pointer">
              <button
                className="text-lg block text-[0px] absolute left-4 cursor-pointer"
                onClick={() => setQuantityProduct(() => quantityProduct - 1)}
                disabled={quantityProduct === 1}
              >
                <span className="text-2xl leading-[24px] cursor-pointer">
                  -
                </span>
              </button>
              <input
                type="text"
                className="w-[120px] h-9 border px-10 border-gray rounded-full text-center"
                value={quantityProduct}
              />
              <button
                className="text-lg block text-[0px] absolute right-4 cursor-pointer"
                onClick={() => setQuantityProduct(() => quantityProduct + 1)}
              >
                <span className="text-2xl leading-[24px] cursor-pointer">
                  +
                </span>
              </button>
            </div>
            <div className="w-[500px]">
              <button
                className=" justify-center mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300 w-full"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>

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
      <SectionRelatesProduct products={products} />
    </div>
  );
};

export default DetailProduct;
