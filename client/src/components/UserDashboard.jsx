import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { category } from "../../category";
import CategoryCard from "./CategoryCard";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShopCard from "./ShopCard";

const UserDashboard = () => {
  const { currentCity, shopsInMyCity } = useSelector((state) => state.user);
  const categoryScrool = useRef();
  const shopScroolRef = useRef();
  const [showLeftcatButton, setShowLeftCatButton] = useState(false);
  const [showRightcatButton, setShowRightCatButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const handleShowButton = (ref, showLeftButton, showRightButton) => {
    const element = ref.current;
    // console.log(element.scrollLeft);
    if (element) {
      showLeftButton(element.scrollLeft > 0);
      // console.log(element.clientWidth);
      showRightButton(
        element.clientWidth + element.scrollLeft < element.scrollWidth
      );
    }
  };

  const scroolHandler = (ref, direction) => {
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
    if (categoryScrool.current) {
      const checkButtons = () =>
        handleShowButton(
          categoryScrool,
          setShowLeftCatButton,
          setShowRightCatButton
        );

      const checkShopButtons = () =>
        handleShowButton(
          shopScroolRef,
          setShowLeftShopButton,
          setShowRightShopButton
        );

      // Run initially
      checkButtons();
      checkShopButtons();

      categoryScrool.current.addEventListener("scroll", checkButtons);
      shopScroolRef.current.addEventListener("scroll", checkShopButtons);

      return () => {
        categoryScrool.current.removeEventListener("scroll", checkButtons);
        shopScroolRef.current.removeEventListener("scroll", checkShopButtons);
      };
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>

        <div className="w-full relative">
          {showLeftcatButton && (
            <button
              className=" absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 "
              onClick={() => scroolHandler(categoryScrool, "left")}
            >
              <FaChevronLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 "
            ref={categoryScrool}
          >
            {category.map((cat, index) => (
              <CategoryCard data={cat} key={index} />
            ))}
          </div>
          {showRightcatButton && (
            <button
              className=" absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 "
              onClick={() => scroolHandler(categoryScrool, "right")}
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        <div className="w-full flex flex-col relative">
          <div className="mt-5 mb-2">
            <h2 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
              Near By Resturents
            </h2>
          </div>
          {showLeftShopButton && (
            <button
              className=" absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 "
              onClick={() => scroolHandler(shopScroolRef, "left")}
            >
              <FaChevronLeft />
            </button>
          )}
          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 "
            ref={shopScroolRef}
          >
            {shopsInMyCity.map((shop) => (
              <ShopCard data={shop} key={shop._id} />
            ))}
          </div>
          {showRightShopButton && (
            <button
              className=" absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 "
              onClick={() => scroolHandler(shopScroolRef, "right")}
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default UserDashboard;
