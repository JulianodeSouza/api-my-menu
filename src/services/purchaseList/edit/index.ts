import ErrorApi from "@/api/middlewares/errors";
import { IListPurchase } from "@/types/listPurchase";
import PurchaseEditProvider from "./provider";
import { validateData } from "@/utils/validateData";

export default class PurchaseListEditService {
  private provider: PurchaseEditProvider;

  constructor() {
    this.provider = new PurchaseEditProvider();
  }

  async editItem(
    idItem: number,
    data: Partial<IListPurchase>,
  ): Promise<void> {
    if (!idItem || !Number.isInteger(idItem) || idItem <= 0) {
      throw new ErrorApi("Item inválido", 400);
    }

    const validatedData = validateData(data, "edit");

    if (!validatedData) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    const payload: Partial<IListPurchase> = {};

    if (data.name !== undefined) payload.name = data.name.trim();
    if (data.quantity !== undefined) payload.quantity = data.quantity;
    if (data.category !== undefined) payload.category = Number(data.category);
    if (data.measuredUnit !== undefined)
      payload.measuredUnit = Number(data.measuredUnit);
    if (data.totalCaught !== undefined) payload.totalCaught = data.totalCaught;
    if (data.amount !== undefined) payload.amount = data.amount;
    if (data.checked !== undefined) payload.checked = data.checked;

    await this.provider.editItem(idItem, payload);
  }
}
