import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData.role);
  return (
    <div className="w-[100vw] min-h-[100vh] pt-[100px] flex items-center bg-[#fff9f6]">
      {userData.role == "user" && <UserDashboard />}
      {userData.role == "owner" && <OwnerDashboard />}
      {userData.role == "deliveryBoy" && <DeliveryBoyDashboard />}
    </div>
  );
};

export default Home;
