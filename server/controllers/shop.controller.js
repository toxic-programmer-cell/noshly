import uploadOnCloudinary from "../utils/cloudinary.js";
import { Shop } from "../models/shop.model.js";

export const createAndEditShop = async (req, res) => {
  try {
    console.log(req.body);
    console.log("File:", req.file);
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true }
      );
    }

    await shop.populate("owner items");
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Create Shope Error ${error}` });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { updatedAt: -1 } },
      });
    if (!shop) {
      return null;
    }
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Get shop error ${error}` });
  }
};

export const getShopByCity = async (req, res) => {
  try {
    console.log("come here");
    const { currentCity } = req.params;
    console.log(currentCity);

    const shops = await Shop.find({
      city: { $regex: new RegExp(`${currentCity}$`, "i") },
    }).populate("items");
    console.log("Shops By City: ", shops);

    if (!shops) {
      return res.status(400).json({ message: "Shop Not Found" });
    }
    console.log(shops);
    return res.status(200).json(shops);
  } catch (error) {
    return res.status(500).json({ message: `Get shop By City error ${error}` });
  }
};
