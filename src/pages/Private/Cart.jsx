import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCartItems,
  reduceCart,
  updateQuantity,
} from "../../redux/features/cartSlice";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const [items, setItems] = useState([]);
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };
  const handleIncrease = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };
  const handleRemoveItem = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    const title = cartItems.map((i) => i.title).join(",");
    if (!item) return;

    requireAuth(() => {
      dispatch(reduceCart({ id: itemId, cartItem: item.cartItem })),
        toast.success(`Xóa ${title} thành công khỏi giỏ hàng!`, {
          autoClose: 1000,
        });
    });
  };
  const handleCheckout = async () => {
    await Swal.fire({
      title: "Success checkout?",
      icon: "success",
      // timer: 1000,
      // timerProgressBar: true,
      // showConfirmButton: false,
    });
    dispatch(clearCartItems());
    navigate("/");
  };
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);
  return (
    <div>
      {items.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <table className="text-left border m-5 flex-col items-center justify-center">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-center border-r">Product</th>
                <th className="p-4 text-center border-r">Quantity</th>
                <th className="p-4 text-center border-r">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  {/* Product */}
                  <td className="p-4 flex items-center gap-3 border-r">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-[300px] h-full object-cover rounded"
                    />
                    <div className="w-[200px]">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-lg text-red-500">${item.price}</div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="p-4 text-center border-r">
                    <div className="relative w-[120px] mx-auto">
                      <button
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl"
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-full h-9 border px-10 border-gray-300 rounded-full text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl"
                        onClick={() => handleIncrease(item.id, item.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="p-4 text-center font-medium border-r">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>

                  {/* Delete */}
                  <td className="p-4 text-center">
                    <button
                      className="text-gray-500 hover:text-red-500 text-xl"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col text-xl font-bold justify-center items-center gap-2 m-5">
            <div>
              <span>Total amount:</span>
              <span className="text-red-500 text-lg pl-2">
                ${totalAmount.toFixed("2")}
              </span>
            </div>
            <button
              className=" justify-center mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-white bg-black rounded-full text-[15px] hover:bg-white hover:text-black transition-all duration-300 w-40"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h3 className="flex justify-center items-center">
          Chưa có sản phẩm nào trong giỏ hàng
        </h3>
      )}
    </div>
  );
};

export default Cart;
