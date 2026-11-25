import sequelize from "@/infra/models";
import { captureError } from "@/infra/sentry";
import { Request, Response, Router } from "express";

export const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    captureError(error, { check: "healthcheck_database" });
    res.status(503).json({
      status: "error",
      message: "Database connection unavailable",
      timestamp: new Date().toISOString(),
    });
  }
});
