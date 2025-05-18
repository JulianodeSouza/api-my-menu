import { Router } from "express";
export const router = Router();

import { getSupermarketList, saveItem } from "./supermarket";

router.get("/", getSupermarketList);
router.post("/", saveItem);
