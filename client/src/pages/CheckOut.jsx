import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { serverUrl } from "../App";

function RecenterMap({ location }) {
  const map = useMap();
  map.setView([location.lat, location.lon], 16, { animate: true });
}

function CheckOut() {
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { location, address } = useSelector((state) => state.map);
  const { cartItems } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quentity,
    0
  );

  const deliveryCharge = totalAmount > 500 ? 0 : 50;
  const amountWithDelivery = totalAmount + deliveryCharge;

  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  const onDragEnd = (e) => {
    console.log(e.target._latlng);
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getLocationByLatLon(lat, lng);
  };

  const getLocationByLatLon = async (latitude, longitude) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(result.data?.results[0]?.address_line2));
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //   console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getLocationByLatLon(latitude, longitude);
    });
  };

  const getLatLonByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      // console.log(result.data.features[0].properties);
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
      dispatch(setAddress(addressInput));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.lon,
          },
          totalAmount,
          cartItems,
        },
        { withCredentials: true }
      );

      console.log("order result", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f6] p-6 ">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBackOutline size={35} className="text-green-600" />
      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl p-6 space-y-6 shadow-2xl ">
        <h1 className="font-bold text-2xl text-gray-800">Checkout</h1>

        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 ">
            <IoLocationSharp size={20} className="text-green-600" />
            Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 p-2 "
              placeholder="Enter your delivery address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={getLatLonByAddress}
            >
              <IoSearchSharp size={20} />
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={getCurrentLocation}
            >
              <TbCurrentLocation size={20} />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center">
              <MapContainer
                className={"w-full h-full"}
                center={[location.lat, location.lon]}
                style={{ height: "100%", width: "100%" }}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker
                  position={[location.lat, location.lon]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                paymentMethod === "cod"
                  ? "border-green-600 bg-orange-50 shadow"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <MdDeliveryDining
                  size={20}
                  className="text-green-600 text-xl"
                />
              </span>
              <div>
                <p className="font-medium text-gray-800">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when food arrives</p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                paymentMethod === "online"
                  ? "border-green-600 bg-orange-50 shadow"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <FaMobileScreen size={20} className="text-purple-600 text-xl" />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <FaCreditCard size={20} className="text-blue-600 text-xl" />
              </span>
              <div>
                <p className="font-medium text-gray-800">
                  UPI / Credit / Debit Card
                </p>
                <p className="text-xs text-gray-500">Pay securly online</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Order Summary
          </h2>
          <div className="rounded-xl border p-4 space-y-2 bg-gray-50">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-gray-900"
              >
                <span>
                  {item.name} x {item.quentity}
                </span>
                <span>₹{item.price * item.quentity}</span>
              </div>
            ))}
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between items-center text-gray-900 font-semibold">
              <span>SubTotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center text-gray-900">
              <span>Delivery Charge</span>
              <span>{deliveryCharge == 0 ? "Free" : `₹${deliveryCharge}`}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-orange-600">
              <span>Total</span>
              <span>₹{amountWithDelivery}</span>
            </div>
          </div>
        </section>

        <button
          className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          onClick={handlePlaceOrder}
        >
          {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
