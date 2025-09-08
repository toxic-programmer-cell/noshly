import React from "react";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const Nav = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex top-[80px] left-[5%] fixed">
          <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={20} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="flex items-center gap-[10px] w-[80%]">
            <IoMdSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search food..."
              className="w-full px-[10px] text-gray-600 outline-0"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Noshly</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{city}</div>
        </div>
        <div className="flex items-center gap-[10px] w-[80%]">
          <IoMdSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search food..."
            className="w-full px-[10px] text-gray-600 outline-0"
          />
        </div>
      </div>
      <div className="flex gap-[20px] items-center justify-center">
        {showSearch ? (
          <RxCross2
            size={25}
            className="text-[#ff4d2d] md:hidden cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        ) : (
          <IoMdSearch
            size={25}
            className="text-[#ff4d2d] md:hidden cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        <div className="relative cursor-pointer">
          <IoCartOutline size={30} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold  cursor-pointer uppercase"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData.fullName.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer md:hidden">
              My Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
