import MeasuredUnitsDeleteService from "@/services/measuredUnits/delete";
import MeasuredUnitsEditService from "@/services/measuredUnits/edit";
import MeasuredUnitsRegisterService from "@/services/measuredUnits/register";
import MeasuredUnitsService from "@/services/measuredUnits";
import { Request, Response } from "express";

export async function getAllMeasuredUnits(_req: Request, _res: Response) {
  const measuredUnitsService = new MeasuredUnitsService();
  const measuredUnits = await measuredUnitsService.getAllMeasuredUnits();

  _res.json(measuredUnits);
}

export async function registerMeasuredUnit(_req: Request, _res: Response) {
  await new MeasuredUnitsRegisterService().registerMeasuredUnit(_req.body);

  _res.json({});
}

export async function editMeasuredUnit(_req: Request, _res: Response) {
  const idMeasuredUnit = Number(_req.params.id);
  await new MeasuredUnitsEditService().editMeasuredUnit(idMeasuredUnit, _req.body);

  _res.json({});
}

export async function removeMeasuredUnit(_req: Request, _res: Response) {
  const idMeasuredUnit = Number(_req.params.id);
  await new MeasuredUnitsDeleteService().removeMeasuredUnit(idMeasuredUnit);

  _res.json({});
}
