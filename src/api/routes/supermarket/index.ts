import { Router } from "express";
export const router = Router();

import { getSupermarketList, removeItem, saveItem } from "./supermarket";

router.get("/", getSupermarketList);
router.post("/", saveItem);
router.delete("/:id", removeItem);
