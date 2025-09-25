import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import Additem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemByCity from "./hooks/useGetItemByCity";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
export const serverUrl = "https://noshly-backend.onrender.com";

function App() {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemByCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route path="/create-edit-shope" element={<CreateEditShop />} />
      <Route
        path="/add-item"
        element={userData ? <Additem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/cart"
        element={userData ? <CartPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/checkout"
        element={userData ? <CheckOut /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
