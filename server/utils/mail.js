import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS exists:", !!process.env.PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  // port: 465,
  // secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

console.log(transporter);

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Password",
    html: `<p>Your OTP for rest password is <b>${otp}</b>. It expires in 5 Minutes.</p>`,
  });
};
