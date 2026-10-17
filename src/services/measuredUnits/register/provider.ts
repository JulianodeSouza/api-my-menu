import MeasuredUnitRepository from "@/infra/repository/measuredUnit";
import { IMeasuredUnit } from "@/types/measuredUnit";

export default class MeasuredUnitsRegisterProvider {
  async registerMeasuredUnit(data: IMeasuredUnit): Promise<void> {
    await new MeasuredUnitRepository().register(data);
  }
}
