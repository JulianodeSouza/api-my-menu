import { Router } from "express";
export const router = Router();

import {
  editItem,
  finishPurchase,
  getItemOfListById,
  getSupermarketList,
  markItem,
  removeItem,
  saveItem,
} from "./supermarket";

router.get("/", getSupermarketList);
router.get("/item/:id", getItemOfListById);

router.post("/", saveItem);
router.post("/mark-item/:id", markItem);
router.post("/finish-purchase", finishPurchase);

router.delete("/:id", removeItem);

router.put("/:id", editItem);
