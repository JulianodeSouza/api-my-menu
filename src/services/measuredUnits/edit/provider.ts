import MeasuredUnitRepository from "@/infra/repository/measuredUnit";
import { IMeasuredUnit } from "@/types/measuredUnit";

export default class MeasuredUnitsEditProvider {
  async editMeasuredUnit(
    idMeasuredUnit: number,
    data: Partial<IMeasuredUnit>,
  ): Promise<void> {
    await new MeasuredUnitRepository().updateRegister(idMeasuredUnit, data);
  }
}
