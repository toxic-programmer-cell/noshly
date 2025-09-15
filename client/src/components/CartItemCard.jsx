import React from "react";
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  // const { cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDecrease = (id, currentQnt) => {
    dispatch(updateQuantity({ id, quentity: (currentQnt += 1) }));
  };

  const handleIncrease = (id, currentQnt) => {
    if (currentQnt > 1)
      dispatch(updateQuantity({ id, quentity: (currentQnt -= 1) }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-xl/30 rounded-xl p-4 mb-4 hover:shadow-lg transition">
      {/* Image + Details */}
      <div className="flex items-center gap-4 w-full md:w-1/2">
        <img
          src={data.image}
          alt={data.name}
          className="w-24 h-24 object-cover rounded-lg border loding:lazy"
        />
        <div>
          <p className="font-semibold text-lg text-gray-800">{data.name}</p>
          <p className="text-gray-500">Price: ₹{data.price}</p>
          <p className="font-medium text-green-600">
            Total: ₹{data.price * data.quentity}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center md:items-end gap-3 mt-4 md:mt-0">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            className="hover:scale-110 transition"
            onClick={() => handleIncrease(data.id, data.quentity)}
          >
            <FaMinusCircle className="text-green-600 text-2xl" />
          </button>
          <span className="text-lg font-semibold">{data.quentity}</span>
          <button
            className="hover:scale-110 transition"
            onClick={() => handleDecrease(data.id, data.quentity)}
          >
            <FaPlusCircle className="text-green-600 text-2xl" />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
            Place Order
          </button>
          <button
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            onClick={() => dispatch(removeCartItem(data.id))}
          >
            <FaTrashAlt />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
