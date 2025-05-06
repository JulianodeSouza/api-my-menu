import { Router } from "express";
export const router = Router();

import { getSupermarketList } from "./supermaket";

router.get("/", getSupermarketList);
