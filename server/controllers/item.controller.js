import { Item } from "../models/item.model.js";
import { Shop } from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });
    console.log("Shope Data:", shop);
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }
    const item = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });
    console.log(item);
    shop.items.push(item._id);
    await shop.save();
    await shop.populate("items owner");

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Add item error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.ItemId;
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        price,
        foodType,
        image,
      },
      { new: true }
    );
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ message: `Edit item Error ${error}` });
  }
};
