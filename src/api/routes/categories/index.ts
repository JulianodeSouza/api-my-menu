import { Router } from "express";
export const router = Router();

import { getCategoriesList, registerCategory } from "./categories";

router.get("/", getCategoriesList);
router.post("/", registerCategory);
