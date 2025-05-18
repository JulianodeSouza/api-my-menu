import { NextFunction, Request, Response, Router } from "express";
import { errorHandler } from "./middlewares/error-handler";
import { router as supermarketRoutes } from "./routes/supermarket";

export const router = Router();

router.use((_req: Request, _res: Response, next: NextFunction) => {
  _res.header("Access-Control-Allow-Origin", "*");
  _res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

router.use("/list-supermarket", supermarketRoutes);
router.use("/list-supermarket", errorHandler);
