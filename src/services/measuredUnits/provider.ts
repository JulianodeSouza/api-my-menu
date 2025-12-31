import MeasuredUnitRepository from "@/infra/repository/measuredUnit";
import DefaultProvider from "../system/defaultProvider";

export default class MeasuredUnitsProvider extends DefaultProvider {
  async getAllMeasuredUnits() {
    const measuredUnitRepository = new MeasuredUnitRepository();
    const measuredUnits = await measuredUnitRepository.getAllMeasuredUnits();

    return measuredUnits;
  }
}
