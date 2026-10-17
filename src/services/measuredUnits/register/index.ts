import ErrorApi from "@/api/middlewares/errors";
import { IMeasuredUnit } from "@/types/measuredUnit";
import MeasuredUnitsRegisterProvider from "./provider";

export default class MeasuredUnitsRegisterService {
  private provider: MeasuredUnitsRegisterProvider;

  constructor() {
    this.provider = new MeasuredUnitsRegisterProvider();
  }

  async registerMeasuredUnit(data: IMeasuredUnit): Promise<void> {
    if (
      typeof data?.name !== "string" ||
      data.name.length === 0 ||
      typeof data?.unitSymbol !== "string" ||
      data.unitSymbol.length === 0
    ) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.registerMeasuredUnit(data);
  }
}
