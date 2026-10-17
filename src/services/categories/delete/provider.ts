import CategoriesRepository from "@/infra/repository/categories";

export default class CategoriesDeleteProvider {
  async removeCategory(idCategory: number): Promise<void> {
    await new CategoriesRepository().removeRegister(idCategory);
  }
}
