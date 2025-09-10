import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

const EditItem = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { itemId } = useParams();

  const [currentItem, setCurreniItem] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [loding, setLoding] = useState(false);

  const dispatch = useDispatch();

  const categories = [
    "Snacks",
    "Main Course",
    "Dessert",
    "Pizza",
    "Burgers",
    "Sandwitches",
    "South Indian",
    "Nort Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    console.log(file);
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("foodType", foodType);
      formData.append("price", price);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      );
      // console.log(result.data);
      dispatch(setMyShopData(result.data));
      setLoding(false);
      navigate("/");
    } catch (error) {
      console.log("edit item fect error", error);
      setLoding(false);
    }
  };

  useEffect(() => {
    const fetchItemById = async () => {
      try {
        // console.log(itemId);
        const result = await axios.get(
          `${serverUrl}/api/item/get-item-by-id/${itemId}`,
          { withCredentials: true }
        );
        // console.log(result.data);
        setCurreniItem(result.data);
      } catch (error) {
        console.log("fetch item by id error", error);
      }
    };
    fetchItemById();
  }, [itemId]);

  useEffect(() => {
    if (!currentItem) return;
    setName(currentItem.name || "");
    setPrice(currentItem.price || 0);
    setFrontendImage(currentItem.image || null);
    setCategory(currentItem.category || "");
    setFoodType(currentItem.foodType || "");
  }, [currentItem]);

  return (
    <div className="flex justify-center items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div className="absolute top-[20px] left-[20px] z-[10] mb-[10px]">
        <MdOutlineKeyboardBackspace
          onClick={() => navigate("/")}
          size={25}
          className="text-[#ff4d2d] cursor-pointer"
        />
      </div>
      <div className="max-w-2xl w-lg bg-white shadow-xl p-8 border border-orange-100 ">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">Edit Food</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt="frontendImage"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter Item Price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((cate, index) => (
                <option value={cate} key={index}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">veg</option>
              <option value="non veg">non veg</option>
            </select>
          </div>

          <button
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md cursor-pointer hover:bg-orange-600 hover:shadow-lg transition-colors duration-200"
            disabled={loding}
          >
            {loding ? <HashLoader color="white" size={20} /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
