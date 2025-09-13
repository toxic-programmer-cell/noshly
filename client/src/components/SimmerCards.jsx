import React from "react";

const ShimmerCards = () => {
  return (
    <div className="w-[200px] md:w-[240px] flex-shrink-0 rounded-3xl overflow-hidden bg-white shadow-lg animate-pulse relative">
      {/* Image placeholder */}
      <div className="h-[140px] md:h-[160px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse relative">
        {/* Optional badge placeholder */}
        <div className="absolute top-3 left-3 h-5 w-16 bg-gray-300 rounded-full"></div>
        <div className="absolute top-3 right-3 h-5 w-5 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="flex items-center justify-between mt-3">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded-lg w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCards;
