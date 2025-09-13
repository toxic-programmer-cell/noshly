import React from "react";

const ShopCard = ({ data }) => {
  return (
    <div className="group w-[180px] h-[200px] md:w-[220px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative">
      {/* Image */}
      <div className="h-[140px] overflow-hidden">
        <img
          src={data.image || "/placeholder.jpg"}
          alt={data.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="p-3 text-center">
        <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate group-hover:text-green-700 transition-colors">
          {data.name}
        </h3>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <button className="bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow hover:bg-green-700 transition-colors">
          Visit Shop
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
