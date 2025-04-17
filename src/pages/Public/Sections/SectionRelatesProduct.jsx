import React from "react";
import BoxProduct from "../Boxs/BoxProduct";

const SectionRelatesProduct = ({ products }) => {
  return (
    <div>
      <span className="flex justify-center items-center text-2xl font-bold">
        Sản phẩm liên quan
      </span>
      <ul className="lg:grid grid-cols-4 gap-5  space-y-3 lg:space-y-0 p-5">
        {products.map((item) => (
          <BoxProduct item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default SectionRelatesProduct;
