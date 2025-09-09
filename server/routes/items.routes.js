import express from "express";
import {
  addItem,
  editItem,
  getItemById,
} from "../controllers/item.controller.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-item-by-id/:itemId", isAuth, getItemById);

export default itemRouter;
