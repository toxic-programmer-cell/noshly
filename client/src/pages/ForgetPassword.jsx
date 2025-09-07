import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loding, setLoding] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoding(true);
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setLoding(false);
      console.log(result);
      setErr("");
      setStep(2);
    } catch (error) {
      setLoding(false);
      setErr(error?.response?.data?.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoding(true);
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setLoding(false);
      console.log(result);
      setErr("");
      setStep(3);
    } catch (error) {
      setLoding(false);
      setErr(error?.response?.data?.message);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return null;
    }
    setLoding(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setLoding(false);
      console.log(result);
      setErr("");
      navigate("/signin");
    } catch (error) {
      setLoding(false);
      setErr(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forget Password
          </h1>
        </div>
        {/* step-1 */}
        {step == 1 && (
          <div className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none "
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleSendOtp}
            >
              {loding ? <ClipLoader size={20} /> : "Send OTP"}
            </button>
            {err && <p className="text-red-500 text-center">*{err}*</p>}
          </div>
        )}
        {/* step-2 */}
        {step == 2 && (
          <div className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none "
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleVerifyOtp}
            >
              {loding ? <ClipLoader size={20} /> : "Verify"}
            </button>
            {err && <p className="text-red-500 text-center">*{err}*</p>}
          </div>
        )}

        {/* step-3 */}
        {step == 3 && (
          <div className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none "
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none "
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleResetPassword}
            >
              {loding ? <ClipLoader size={20} /> : "Reset Password"}
            </button>
            {err && <p className="text-red-500 text-center">*{err}*</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
