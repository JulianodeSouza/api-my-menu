import CategoriesRepository from "@/infra/repository/categories";
import { ICategories } from "@/types/categories";

export default class CategoriesEditProvider {
  async editCategory(idCategory: number, data: Partial<ICategories>): Promise<void> {
    await new CategoriesRepository().updateRegister(idCategory, data);
  }
}
