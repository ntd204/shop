import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { quantity } = cartItems;
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);
  console.log("cartItems", cartItems);
  return (
    <div>
      {items.length > 0 ? (
        <ul className="lg:grid grid-cols-4 gap-5  space-y-3 lg:space-y-0 p-5">
          {cartItems.map((item) => (
            <li key={item.id} className="border rounded-xl">
              <img src={item.thumbnail} />
              <div>
                <span>{item.title}</span>
              </div>
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
                  value={quantity}
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
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="flex justify-center items-center">
          Chưa có sản phẩm nào trong giỏ hàng
        </h3>
      )}
    </div>
  );
};

export default Cart;
