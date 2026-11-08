import CategoriesRepository from "@/infra/repository/categories";
import { ICategories } from "@/types/categories";

export default class CategoriesRegisterProvider {
  async registerCategory(
    data: ICategories,
  ): Promise<{ id: number; name: string }> {
    const categoriesRepository = new CategoriesRepository();
    return await categoriesRepository.register(data);
  }
}
