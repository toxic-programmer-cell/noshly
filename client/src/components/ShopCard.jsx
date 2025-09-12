import React from "react";

const ShopCard = ({ data }) => {
  console.log(data);
  return (
    <div className="w-[170px] h-[170px] md:w-[200px] rounded-2xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden bg-white shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow relative cursor-pointer">
      <img
        src={data.image}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300 "
        alt="category"
      />
      <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-95 px-3 py-1 rounded-t-xl text-center shadow text-sm font-semibold backdrop-blur text-orange-600 ">
        {data.name}
      </div>
    </div>
  );
};

export default ShopCard;
