import React from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";

const ItemCard = ({ data, onAddToCart }) => {
  const { category, foodType, name, price, image } = data;

  // Dynamic foodType icon
  const FoodIcon =
    foodType?.toLowerCase() === "veg" ? (
      <FaLeaf className="text-green-600" size={16} />
    ) : (
      <GiChickenLeg className="text-red-600" size={18} />
    );

  return (
    <div className="w-[200px] md:w-[240px] rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 relative cursor-pointer group">
      {/* Image + Icons */}
      <div className="relative h-[140px] md:h-[160px] overflow-hidden">
        <img
          src={image || "/placeholder.jpg"}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* FoodType Icon */}
        <div className="absolute top-3 left-3 bg-white p-1 rounded-full shadow-md">
          {FoodIcon}
        </div>

        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-white">
          <FiHeart size={16} className="text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[110px]">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 truncate">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">{category}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-green-700 text-lg font-semibold">₹{price}</span>
          <button
            onClick={() => onAddToCart?.(data)}
            className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1 rounded-lg shadow hover:bg-green-700 transition-colors"
          >
            <FiShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
        <button className="bg-white text-green-700 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-green-100 transition-colors">
          View More
        </button>
        <button
          onClick={() => onAddToCart?.(data)}
          className="flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <FiShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
