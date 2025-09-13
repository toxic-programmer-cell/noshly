import React from "react";

const CategoryShimmer = () => {
  return (
    <div className="w-[120px] h-[150px] md:w-[180px] rounded-2xl border border-green-600 shrink-0 overflow-hidden bg-white shadow-lg relative">
      {/* Image placeholder shimmer */}
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-xl"></div>

      {/* Category label shimmer */}
      <div className="absolute bottom-0 left-0 w-full bg-white/70 px-3 py-2 rounded-t-xl text-center backdrop-blur-md shadow-inner">
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded w-2/3 mx-auto mb-2"></div>
        <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  );
};

export default CategoryShimmer;
