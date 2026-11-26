import { Router } from "express";
import { getHealthStatus } from "./health";

export const router = Router();

router.get("/", getHealthStatus);
