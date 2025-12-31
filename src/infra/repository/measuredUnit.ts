import { IMeasuredUnit } from "@/types/measuredUnit";
import RepositoryModel from "./repository";
import { MeasuredUnitEntity } from "../models/measuredUnit";

export default class MeasuredUnitRepository extends RepositoryModel {
  async getAllMeasuredUnits(): Promise<IMeasuredUnit[]> {
    const measuredUnits = await MeasuredUnitEntity.findAll();
    return measuredUnits;
  }
}
