import ErrorApi from "@/api/middlewares/errors";
import CategoriesRegisterProvider from "./provider";
import { ICategories } from "@/types/categories";

export default class CategoriesRegisterService {
  private provider: CategoriesRegisterProvider;

  constructor() {
    this.provider = new CategoriesRegisterProvider();
  }

  async registerCategory(
    data: ICategories,
  ): Promise<{ id: number; name: string }> {
    if (
      typeof data?.name !== "string" ||
      data.name.trim().length === 0 ||
      (data.icon !== undefined && typeof data.icon !== "string")
    ) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    const payload: ICategories = {
      name: data.name.trim(),
      icon: data.icon && data.icon.trim().length > 0 ? data.icon.trim() : "Tag",
    };

    return await this.provider.registerCategory(payload);
  }
}
