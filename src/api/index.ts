import { NextFunction, Request, Response, Router } from "express";
import { router as categoriesRoutes } from "./routes/categories";
import { router as healthRoutes } from "./routes/health";
import { router as measuredUnitsRoutes } from "./routes/measuredUnits";
import { router as supermarketRoutes } from "./routes/supermarket";

export const router = Router();

router.use((_req: Request, _res: Response, next: NextFunction) => {
  _res.header("Access-Control-Allow-Origin", "*");
  _res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

router.use("/health", healthRoutes);
router.use("/list-supermarket", supermarketRoutes);
router.use("/categories", categoriesRoutes);
router.use("/measuredUnits", measuredUnitsRoutes);
