import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoxProduct from "../Public/Boxs/BoxProduct";

const WishList = () => {
  const wishList = useSelector((state) => state.wishListSlice.wishLists);
  const [listWish, setListWish] = useState([]);
  useEffect(() => {
    setListWish(wishList);
  }, [wishList]);

  return (
    <div>
      {listWish.length > 0 ? (
        <ul className="lg:grid grid-cols-4 gap-5  space-y-3 lg:space-y-0 p-5">
          {wishList.map((item, idx) => (
            <BoxProduct key={idx} item={item} />
          ))}
        </ul>
      ) : (
        <h3 className="flex justify-center items-center">
          Chưa có sản phẩm yêu thích nào
        </h3>
      )}
    </div>
  );
};

export default WishList;
