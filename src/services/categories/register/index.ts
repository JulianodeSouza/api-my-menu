import ErrorApi from "@/api/middlewares/errors";
import { ListPurchaseEntity } from "@/infra/models/listPurchase";
import { IListPurchase } from "@/types/listPurchase";
import PurchaseListRegisterProvider from "./provider";
import CategoriesRegisterProvider from "./provider";
import { ICategories } from "@/types/categories";

export default class CategoriesRegisterService {
  private provider: CategoriesRegisterProvider;

  constructor() {
    this.provider = new CategoriesRegisterProvider();
  }

  async registerCategory(data: ICategories) {
    const validateData = await this.validateData(data);

    if (!validateData) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.registerCategory(data);
  }

  private validateData(data: Partial<ListPurchaseEntity>): boolean {
    const { name } = data;

    if (!name) {
      return false;
    }

    if (typeof name !== "string") {
      return false;
    }

    return true;
  }
}
