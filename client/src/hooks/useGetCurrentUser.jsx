import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";

function useGetCurrentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        console.log("current User", result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}

export default useGetCurrentUser;

//
