import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("TOKEN:", token);
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodeToken) {
      return res.status(400).json({ message: "token not verify" });
    }
    // console.log("DECODETOKEN", decodeToken);
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(400).json({ message: "isAuth error" });
  }
};

export default isAuth;
