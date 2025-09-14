import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);
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
    </div>
  );
};

export default CartPage;
