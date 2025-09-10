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
    console.log("Item Detail :", item);
    shop.items.push(item._id);
    await shop.save();
    await shop.populate([
      { path: "owner" },
      { path: "items", options: { sort: { updatedAt: -1 } } },
    ]);

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Add item error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    // console.log(itemId);
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
    // console.log(item);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId }).populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    // console.log(shop);
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(400).json({ message: `Edit item Error ${error}` });
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId);
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ message: `Get item By Id Error ${error}` });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(400).json({ message: " Item not found" });
    }
    const shop = await Shop.findOne({ owner: req.userId });
    shop.items = shop.items.filter((i) => i._id !== item._id);
    await shop.save();
    await shop.populate({
      path: "items",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json(shop);
  } catch (error) {
    return res.status(400).json({ message: `delete item Error ${error}` });
  }
};
