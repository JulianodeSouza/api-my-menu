import { IMeasuredUnit } from "@/types/measuredUnit";
import MeasuredUnitsProvider from "./provider";

export default class MeasuredUnitsService {
  private provider: MeasuredUnitsProvider;

  constructor() {
    this.provider = new MeasuredUnitsProvider();
  }

  getAllMeasuredUnits(): Promise<IMeasuredUnit[]> {
    const measuredUnits = this.provider.getAllMeasuredUnits();

    if (!measuredUnits) {
      throw new Error("No measured units found");
    }

    return measuredUnits;
  }
}
