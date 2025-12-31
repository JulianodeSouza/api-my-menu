import { Router } from "express";
import { getAllMeasuredUnits } from "./measuredUnits";

export const router = Router();

router.get("/", getAllMeasuredUnits);
