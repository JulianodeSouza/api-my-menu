import ErrorApi from "@/api/middlewares/errors";
import MeasuredUnitsDeleteProvider from "./provider";

export default class MeasuredUnitsDeleteService {
  private provider: MeasuredUnitsDeleteProvider;

  constructor() {
    this.provider = new MeasuredUnitsDeleteProvider();
  }

  async removeMeasuredUnit(idMeasuredUnit: number): Promise<void> {
    if (!idMeasuredUnit) {
      throw new ErrorApi("Unidade de medida inválida", 400);
    }

    await this.provider.removeMeasuredUnit(idMeasuredUnit);
  }
}
