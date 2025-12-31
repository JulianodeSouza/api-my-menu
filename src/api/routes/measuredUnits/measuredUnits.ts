import MeasuredUnitsService from "@/services/measuredUnits";
import { Request, Response } from "express";

export async function getAllMeasuredUnits(_req: Request, _res: Response) {
  const measuredUnitsService = new MeasuredUnitsService();
  const measuredUnits = await measuredUnitsService.getAllMeasuredUnits();

  _res.json(measuredUnits);
}
