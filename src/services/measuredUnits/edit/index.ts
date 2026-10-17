import ErrorApi from "@/api/middlewares/errors";
import { IMeasuredUnit } from "@/types/measuredUnit";
import MeasuredUnitsEditProvider from "./provider";

export default class MeasuredUnitsEditService {
  private provider: MeasuredUnitsEditProvider;

  constructor() {
    this.provider = new MeasuredUnitsEditProvider();
  }

  async editMeasuredUnit(idMeasuredUnit: number, data: Partial<IMeasuredUnit>): Promise<void> {
    if (
      !idMeasuredUnit ||
      (data.name === undefined && data.unitSymbol === undefined) ||
      (data.name !== undefined && typeof data.name !== "string") ||
      (data.unitSymbol !== undefined && typeof data.unitSymbol !== "string")
    ) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.editMeasuredUnit(idMeasuredUnit, data);
  }
}
