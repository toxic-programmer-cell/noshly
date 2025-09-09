import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
const OwnerItemCard = ({ data }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl">
      <div className="w-36 h-full flex-shrink-0 bg-gray-50">
        <img src={data.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div className="">
          <h2 className="text-base font-semibold text-[#ff4d2d]">
            {data.name}
          </h2>
          <p>
            <span className="font-semibold text-gray-800">Category: </span>
            {data.category}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Food Type: </span>
            {data.foodType}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#ff4d2d] font-bold">₹{data.price}</div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-[#ff4d2d]/10  text-[#ff4d2d] cursor-pointer">
              <FaPen />
            </div>
            <div className="p-2 rounded-full hover:bg-[#ff4d2d]/10  text-[#ff4d2d] cursor-pointer">
              <FaTrashAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
