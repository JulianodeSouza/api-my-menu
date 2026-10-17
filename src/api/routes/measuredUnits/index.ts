import { Router } from "express";
import {
  editMeasuredUnit,
  getAllMeasuredUnits,
  registerMeasuredUnit,
  removeMeasuredUnit,
} from "./measuredUnits";

export const router = Router();

router.get("/", getAllMeasuredUnits);
router.post("/", registerMeasuredUnit);
router.put("/:id", editMeasuredUnit);
router.delete("/:id", removeMeasuredUnit);
