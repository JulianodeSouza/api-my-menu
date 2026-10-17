import ErrorApi from "@/api/middlewares/errors";
import CategoriesRegisterProvider from "./provider";
import { ICategories } from "@/types/categories";

export default class CategoriesRegisterService {
  private provider: CategoriesRegisterProvider;

  constructor() {
    this.provider = new CategoriesRegisterProvider();
  }

  async registerCategory(data: ICategories): Promise<void> {
    if (
      typeof data?.name !== "string" ||
      data.name.length === 0 ||
      (data.icon !== undefined && typeof data.icon !== "string")
    ) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.registerCategory(data);
  }
}
