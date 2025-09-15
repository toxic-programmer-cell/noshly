import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { category } from "../../category";
import CategoryCard from "./CategoryCard";
import ShopCard from "./ShopCard";
import ItemCard from "./ItemCard";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShimmerCards from "./SimmerCards";

const UserDashboard = () => {
  const { itemInMyCity, shopsInMyCity } = useSelector((state) => state.user);
  const categoryScroll = useRef();
  const shopScrollRef = useRef();

  const [showLeftCatButton, setShowLeftCatButton] = useState(false);
  const [showRightCatButton, setShowRightCatButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const handleShowButton = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (el) {
      setLeft(el.scrollLeft > 0);
      setRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left:
          direction === "left"
            ? -ref.current.clientWidth
            : ref.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!categoryScroll.current) return;

    if (categoryScroll.current && shopScrollRef.current) {
      const checkCategory = () =>
        handleShowButton(
          categoryScroll,
          setShowLeftCatButton,
          setShowRightCatButton
        );
      const checkShop = () =>
        handleShowButton(
          shopScrollRef,
          setShowLeftShopButton,
          setShowRightShopButton
        );

      checkCategory();
      checkShop();

      const catEl = categoryScroll.current;
      const shopEl = shopScrollRef.current;

      catEl.addEventListener("scroll", checkCategory);
      shopEl.addEventListener("scroll", checkShop);

      return () => {
        if (catEl) catEl.removeEventListener("scroll", checkCategory);
        if (shopEl) shopEl.removeEventListener("scroll", checkShop);
      };
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 items-center bg-gradient-to-b from-green-50 via-white to-green-50 overflow-y-auto p-4">
      <Nav />

      {/* Categories */}
      <div className="w-full max-w-6xl flex flex-col gap-4">
        <h1 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-wide drop-shadow-sm">
          Inspiration for your first order
        </h1>

        <div className="w-full relative bg-[#D3EEDD] rounded-xl py-3 px-1 hover:bg-green-200 transition-all duration-400">
          {showLeftCatButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-110 transition-all z-10"
              onClick={() => scrollHandler(categoryScroll, "left")}
            >
              <FaChevronLeft size={18} />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4"
            ref={categoryScroll}
          >
            {!category || category.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <CategoryShimmerCard key={i} />
                ))
              : category.map((cat, idx) => (
                  <CategoryCard data={cat} key={idx} />
                ))}
          </div>

          {showRightCatButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-110 transition-all z-10"
              onClick={() => scrollHandler(categoryScroll, "right")}
            >
              <FaChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Shops */}
      <div className="w-full max-w-6xl flex flex-col gap-4 relative">
        <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold tracking-tight border-b-2 border-green-300 w-fit pb-1 mb-2">
          Near By Restaurants
        </h2>

        {showLeftShopButton && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-110 transition-all z-10"
            onClick={() => scrollHandler(shopScrollRef, "left")}
          >
            <FaChevronLeft size={18} />
          </button>
        )}

        <div
          className="w-full flex overflow-x-auto gap-4 pb-2 whitespace-nowrap bg-[#D3EEDD] py-2 px-1 rounded-xl hover:bg-green-200 transition-all duration-400"
          ref={shopScrollRef}
        >
          {!shopsInMyCity || shopsInMyCity.length === 0
            ? Array.from({ length: 6 }).map((_, i) => <ShimmerCards key={i} />)
            : shopsInMyCity.map((shop) => (
                <ShopCard data={shop} key={shop._id} />
              ))}
        </div>

        {showRightShopButton && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-110 transition-all z-10"
            onClick={() => scrollHandler(shopScrollRef, "right")}
          >
            <FaChevronRight size={18} />
          </button>
        )}
      </div>

      {/* Items */}
      <div className="w-full max-w-6xl flex flex-col gap-4">
        <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold tracking-tight border-b-2 border-green-300 w-fit pb-1 mb-2">
          Food in your city
        </h2>

        <div className="w-full flex flex-wrap gap-4 pb-2 items-center justify-center bg-[#D3EEDD] py-2 px-1 rounded-xl hover:bg-green-200 transition-all duration-400">
          {!itemInMyCity || itemInMyCity.length === 0
            ? Array.from({ length: 6 }).map((_, i) => <ShimmerCards key={i} />)
            : itemInMyCity.map((item) => (
                <ItemCard data={item} key={item._id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
