import ErrorApi from "@/api/middlewares/errors";
import { IListPurchase } from "@/types/listPurchase";
import PurchaseEditProvider from "./provider";
import { validateData } from "@/utils/validateData";

export default class PurchaseListEditService {
  private provider: PurchaseEditProvider;

  constructor() {
    this.provider = new PurchaseEditProvider();
  }

  async editItem(idItem: number, data: IListPurchase): Promise<void> {
    const validatedData = await validateData(data);

    if (!validatedData) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.editItem(idItem, data);
  }
}
