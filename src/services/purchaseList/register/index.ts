import ErrorApi from "@/api/middlewares/errors";
import { ICheckedData, IListPurchase } from "@/types/listPurchase";
import PurchaseListRegisterProvider from "./provider";
import { validateData } from "@/utils/validateData";

export default class PurchaseListRegisterService {
  private provider: PurchaseListRegisterProvider;

  constructor() {
    this.provider = new PurchaseListRegisterProvider();
  }

  async registerItem(data: IListPurchase): Promise<void> {
    const validatedData = await validateData(data, "register");

    if (!validatedData) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.registerItem(data);
  }

  async markItem(idItem: number, data: ICheckedData): Promise<void> {
    if (!idItem || !data) {
      throw new ErrorApi("Item inválido", 400);
    }

    const validatedData = await validateData(data, "mark");

    if (!validatedData) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.markItem(idItem, data);
  }

  async finishPurchase(): Promise<void> {
    await this.provider.finishPurchase();
  }
}
