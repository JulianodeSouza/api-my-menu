import MeasuredUnitRepository from "@/infra/repository/measuredUnit";

export default class MeasuredUnitsDeleteProvider {
  async removeMeasuredUnit(idMeasuredUnit: number): Promise<void> {
    await new MeasuredUnitRepository().removeRegister(idMeasuredUnit);
  }
}
