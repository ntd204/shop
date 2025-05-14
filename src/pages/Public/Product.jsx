import React, { useEffect, useReducer, useState } from "react";
import BannerTopProduct from "../Banner/BannerTopProduct";
import useFetchGetDataAllCategory from "../../hooks/useFetchGetDataAllCategory";
import BoxProduct from "./Boxs/BoxProduct";
import useFetchDataProduct from "../../hooks/useFetchDataProduct";
import {
  filterProductReducer,
  initialState,
  TYPE_ACTION,
} from "../Reducer/filterProductReducer";
import { Pagination } from "@mui/material";
import useHandleChange from "../../hooks/useHandleChange";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const Product = () => {
  const [category, setCategory] = useState("");
  const { categories } = useFetchGetDataAllCategory();
  const [filterProduct, dispatch] = useReducer(
    filterProductReducer,
    initialState
  );
  const { products, totalProduct } = useFetchDataProduct(
    category,
    filterProduct
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { formData, handleChange } = useHandleChange({ valueSearch: "" });
  const handleSortChange = (e) => {
    const value = e.target.value.split(",");
    dispatch({
      type: TYPE_ACTION.CHANGE_SORT,
      payload: {
        sortBy: value[0],
        order: value[1],
      },
    });
  };
  const handleChangePage = (page) => {
    const skip = (page - 1) * 12;
    dispatch({
      type: TYPE_ACTION.CHANGE_PAGE,
      payload: skip,
    });
  };
  const handleReset = () => {
    dispatch({
      type: TYPE_ACTION.CHANGE_RESET,
      payload: { limit: 12 },
    });
  };
  const debounceSearch = useDebounce(formData.valueSearch, 500);
  useEffect(() => {
    dispatch({
      type: TYPE_ACTION.CHANGE_QUERY,
      payload: debounceSearch || "",
    });
  }, [debounceSearch]);
  useEffect(() => {
    if (filterProduct) {
      const stringifyData = JSON.stringify({ ...filterProduct });
      const dataFilterJson = JSON.parse(stringifyData);
      setSearchParams(new URLSearchParams(dataFilterJson));
    }
  }, [filterProduct]);
  useEffect(() => {
    let tmpDataFilter = {
      limit: 12,
    };
    if (searchParams.size > 0) {
      const dataFromSearchParams = JSON.parse(
        '{"' +
          decodeURI(
            searchParams.toString().replace(/&/g, '","').replace(/=/g, '":"')
          ) +
          '"}'
      );
      tmpDataFilter = {
        limit: dataFromSearchParams["limit"] || 12,
        q: dataFromSearchParams["q"].replace(/\+/g, " "),
        order: dataFromSearchParams["order"],
        sortBy: dataFromSearchParams["sortBy"],
        skip: dataFromSearchParams["skip"],
      };
      dispatch({
        type: TYPE_ACTION.CHANGE_INITIAL,
        payload: { ...tmpDataFilter },
      });
    }
  }, []);
  return (
    <>
      <BannerTopProduct />
      <section className="pt-12 pb-12 bg-gray-200">
        <div className="">
          <div className="lg:grid grid-cols-5">
            <div className="flex justify-center gap-8 col-span-5 p-0 lg:p-4">
              <div className="w-[300px]">
                <h2 className="text-2xl font-semibold">Categories</h2>
                <ul className="mt-4  space-y-3 ">
                  <li>
                    <p
                      onClick={() => setCategory("")}
                      className={`${
                        category
                          ? "text-black font-semibold"
                          : "text-blue-700 font-semibold"
                      } cursor-pointer text-xl `}
                    >
                      Tất cả
                    </p>
                  </li>
                  {categories.map((item, idx) => (
                    <li key={idx}>
                      <p
                        onClick={() => setCategory(item.slug)}
                        className={`${
                          item.slug !== category
                            ? "text-black font-medium"
                            : "text-blue-700 font-bold"
                        } cursor-pointer text-xl hover:text-red-500 transition-all`}
                      >
                        {item.name}
                      </p>
                      <img src={item.url.thumbnail} alt="" />
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <h2 className="text-xl font-semibold">Availability</h2>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <a
                        href="#none"
                        className="font-medium text-gray-500 text-lg hover:text-black transition-all"
                      >
                        In stock (16)
                      </a>
                    </li>
                    <li>
                      <a
                        href="#none"
                        className="font-medium text-gray-500 text-lg hover:text-black transition-all"
                      >
                        Out of stock (1)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                {category ? (
                  ""
                ) : (
                  <div className="flex justify-center gap-3">
                    <div>
                      <select
                        className="w-max px-4 py-2 pr-4 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={handleSortChange}
                        value={`${filterProduct.sortBy}, ${filterProduct.order}`}
                      >
                        <option value="">Mặc định</option>
                        <option value="price,asc">Tăng dần theo giá</option>
                        <option value="price,desc">Giảm dần theo giá</option>
                        <option value="title,asc">A-Z</option>
                        <option value="title,desc">Z-A</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={handleChange}
                      name="valueSearch"
                      value={`${filterProduct.q}`}
                    />
                    <button
                      className="bg-blue-500 w-25 text-white border border-gray-300 rounded-full"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                )}
                <ul className="lg:grid grid-cols-4 gap-5  space-y-3 lg:space-y-0 pt-5">
                  {products.length > 0 &&
                    products.map((item, idx) => (
                      <BoxProduct key={idx} item={item} />
                    ))}
                </ul>
                {!category && (
                  <div className="mt-10 flex justify-center">
                    {
                      <Pagination
                        onChange={(e, page) => handleChangePage(page)}
                        count={Math.ceil(totalProduct / 12)}
                        variant="outlined"
                      />
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
