import { Router } from "express";
export const router = Router();

import {
  editCategory,
  getCategoriesList,
  registerCategory,
  removeCategory,
} from "./categories";

router.get("/", getCategoriesList);
router.post("/", registerCategory);
router.put("/:id", editCategory);
router.delete("/:id", removeCategory);
