import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) {}
