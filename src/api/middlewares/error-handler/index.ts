import { NextFunction, Request, Response } from "express";
import { captureError } from "../../../infra/sentry";
import { logMessage } from "../../../services/utils";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logMessage(error);

  const message = error.message || "Internal Server Error";
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    captureError(error, {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      params: req.params,
      query: req.query,
    });
  }

  res.status(statusCode).json({
    data: {
      message,
    },
  });
};
