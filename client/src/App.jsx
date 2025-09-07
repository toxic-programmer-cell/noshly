import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
export const serverUrl = "http://localhost:8000";

function App() {
  useGetCurrentUser();
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App;
