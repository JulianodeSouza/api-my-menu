import CategoriesRepository from "@/infra/repository/categories";
import { ICategories } from "@/types/categories";
import { CategoryEntity } from "@/infra/models/category";

export default class CategoriesEditProvider {
  private repository: CategoriesRepository;

  constructor() {
    this.repository = new CategoriesRepository();
  }

  async getCategoryById(idCategory: number): Promise<CategoryEntity | null> {
    return await this.repository.getCategoryById(idCategory);
  }

  async editCategory(idCategory: number, data: Partial<ICategories>): Promise<void> {
    await this.repository.updateRegister(idCategory, data);
  }
}
