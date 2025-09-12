import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { category } from "../../category";
import CategoryCard from "./CategoryCard";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const UserDashboard = () => {
  const categoryScrool = useRef();
  const [showLeftcatButton, setShowLeftCatButton] = useState(false);
  const [showRightcatButton, setShowRightCatButton] = useState(false);

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

      // Run initially
      checkButtons();

      categoryScrool.current.addEventListener("scroll", checkButtons);

      return () => {
        categoryScrool.current.removeEventListener("scroll", checkButtons);
      };
    }
  }, []);

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
      </div>
    </div>
  );
};

export default UserDashboard;
