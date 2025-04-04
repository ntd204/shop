import React from "react";
import { Link } from "react-router-dom";
import BoxProduct from "../Boxs/BoxProduct";

const SectionBestSeller = ({ products }) => {
  return (
    <div className="p-9 bg-gray-200">
      <div className=" flex items-center justify-between  p-5">
        <p className="font-bold text-3xl ">
          Bestseller
          <p className="font-light text-xl text-gray-500 mt-2">
            Experience the best products at our store!
          </p>
        </p>

        <Link
          to={"/product"}
          className="mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
        >
          View all
        </Link>
      </div>
      <ul className="lg:grid grid-cols-4 gap-5  space-y-3 lg:space-y-0 p-5">
        {products.slice(10, 18).map((item, idx) => (
          <BoxProduct key={idx} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default SectionBestSeller;
