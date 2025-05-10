import { NextFunction, Request, Response } from "express";
import { logMessage } from "../../../services/utils";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logMessage(error);

  const message = error.message || "Internal Server Error";

  res.status(500).json({
    data: {
      message,
    },
  });
};
