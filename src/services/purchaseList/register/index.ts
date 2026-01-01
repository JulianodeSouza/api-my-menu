import ErrorApi from "@/api/middlewares/errors";
import { ListPurchaseEntity } from "@/infra/models/listPurchase";
import { ICheckedData, IListPurchase } from "@/types/listPurchase";
import PurchaseListRegisterProvider from "./provider";

export default class PurchaseListRegisterService {
  private provider: PurchaseListRegisterProvider;

  constructor() {
    this.provider = new PurchaseListRegisterProvider();
  }

  async registerItem(data: IListPurchase): Promise<void> {
    const validateData = await this.validateData(data);

    if (!validateData) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.registerItem(data);
  }

  async markItem(idItem: number, data: ICheckedData): Promise<void> {
    if (!idItem || !data) {
      throw new ErrorApi("Item inválido", 400);
    }

    await this.provider.markItem(idItem, data);
  }

  async finishPurchase(): Promise<void> {
    await this.provider.finishPurchase();
  }

  private validateData(data: Partial<ListPurchaseEntity>): boolean {
    const { name, quantity } = data;

    if (!name || !quantity) {
      return false;
    }

    if (typeof quantity !== "number" || typeof name !== "string") {
      return false;
    }

    return true;
  }
}
