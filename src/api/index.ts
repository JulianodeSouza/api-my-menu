import { NextFunction, Request, Response, Router } from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { router as supermarketRoutes } from "./routes/supermarket/index.js";

export const router = Router();

router.use((_req: Request, _res: Response, next: NextFunction) => {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = _req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    _res.header("Access-Control-Allow-Origin", origin);
  }

  _res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

router.use("/list-supermarket", supermarketRoutes);
router.use("/list-supermarket", errorHandler);
