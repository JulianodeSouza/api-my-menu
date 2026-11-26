import { NextFunction, Request, Response } from "express";
import { logMessage } from "../../../services/utils";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logMessage(error instanceof Error ? error.stack || error.message : String(error));

  const message = error.message || "Internal Server Error";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    data: {
      message,
    },
  });
};
