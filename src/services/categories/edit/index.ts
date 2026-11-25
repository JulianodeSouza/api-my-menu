import ErrorApi from "@/api/middlewares/errors";
import { ICategories } from "@/types/categories";
import CategoriesEditProvider from "./provider";

export default class CategoriesEditService {
  private provider: CategoriesEditProvider;

  constructor() {
    this.provider = new CategoriesEditProvider();
  }

  async editCategory(
    idCategory: number,
    data: Partial<ICategories>,
  ): Promise<{ id: number; name: string; icon: string }> {
    if (!idCategory || !this.isValidData(data)) {
      throw new ErrorApi("Dados inválidos", 400);
    }

    const existingCategory = await this.provider.getCategoryById(idCategory);
    if (!existingCategory) {
      throw new ErrorApi("Categoria não encontrada", 404);
    }

    const payload: Partial<ICategories> = {};

    if (data.name !== undefined) {
      payload.name = data.name.trim();
    }

    if (data.icon !== undefined) {
      payload.icon =
        typeof data.icon === "string" && data.icon.trim().length > 0
          ? data.icon.trim()
          : "Tag";
    }

    await this.provider.editCategory(idCategory, payload);

    return {
      id: idCategory,
      name: payload.name ?? existingCategory.name,
      icon: payload.icon ?? existingCategory.icon ?? "Tag",
    };
  }

  private isValidData(data: Partial<ICategories>): boolean {
    if (!data || typeof data !== "object") {
      return false;
    }

    const hasName = data.name !== undefined;
    const hasIcon = data.icon !== undefined;

    if (!hasName && !hasIcon) {
      return false;
    }

    if (
      hasName &&
      (typeof data.name !== "string" || data.name.trim().length === 0)
    ) {
      return false;
    }

    if (hasIcon && data.icon !== null && typeof data.icon !== "string") {
      return false;
    }

    return true;
  }
}
