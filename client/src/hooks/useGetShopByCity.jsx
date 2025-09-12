import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setShopsInMyCity } from "../redux/userSlice.js";

function useGetShopByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchShops = async () => {
      try {
        // console.log(currentCity);
        if (!currentCity) {
          return;
        }
        const result = await axios.get(
          `${serverUrl}/api/shop/get-by-city/${currentCity}`,
          {
            withCredentials: true,
          }
        );
        console.log(result.data);
        dispatch(setShopsInMyCity(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchShops();
  }, [currentCity]);
}

export default useGetShopByCity;

//
