import ErrorApi from "@/api/middlewares/errors";
import { ICategories } from "@/types/categories";
import CategoriesEditProvider from "./provider";

export default class CategoriesEditService {
  private provider: CategoriesEditProvider;

  constructor() {
    this.provider = new CategoriesEditProvider();
  }

  async editCategory(idCategory: number, data: Partial<ICategories>): Promise<void> {
    if (!idCategory || !this.isValidData(data)) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    await this.provider.editCategory(idCategory, data);
  }

  private isValidData(data: Partial<ICategories>): boolean {
    return (
      (data.name === undefined || typeof data.name === "string") &&
      (data.icon === undefined || typeof data.icon === "string") &&
      (data.name !== undefined || data.icon !== undefined)
    );
  }
}
