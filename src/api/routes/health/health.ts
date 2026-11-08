import sequelize from "@/infra/models";
import { Sentry } from "@/infra/sentry";
import { logMessage } from "@/services/utils";
import { Request, Response } from "express";

export async function getHealthStatus(_req: Request, res: Response) {
  try {
    await sequelize.authenticate();

    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logMessage(`Erro no health check (banco de dados): ${error}`);
    Sentry.captureException(error);

    res.status(503).json({
      status: "error",
      message: "Database connection failed",
      timestamp: new Date().toISOString(),
    });
  }
}

