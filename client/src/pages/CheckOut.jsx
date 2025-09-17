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

function RecenterMap({ location }) {
  const map = useMap();
  map.setView([location.lat, location.lon], 16, { animate: true });
}

function CheckOut() {
  const [addressInput, setAddressInput] = useState("");
  const { location, address } = useSelector((state) => state.map);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      console.log(result.data.features[0].properties);
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
      dispatch(setAddress(addressInput));
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
      </div>
    </div>
  );
}

export default CheckOut;
