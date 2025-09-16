import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quentity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
      <div className="w-full max-w-[800px]">
        <div className="flex gap-[20px] mb-6 items-center">
          <div
            className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoArrowBackOutline size={35} className="text-green-600" />
          </div>
          <p className="text-2xl font-extrabold text-green-600">Your Cart</p>
        </div>
        <div>
          {cartItems.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItemCard data={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Total Price */}
            <div>
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-green-600 font-extrabold text-xl">
                ₹{totalPrice}
              </p>
            </div>

            {/* Checkout Button */}
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
              onClick={() => navigate("/checkout")}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
