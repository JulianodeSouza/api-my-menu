import CategoriesRepository from "@/infra/repository/categories";
import { ICategories } from "@/types/categories";

export default class CategoriesRegisterProvider {
  async registerCategory(data: ICategories) {
    const categoriesRepository = new CategoriesRepository();
    await categoriesRepository.register(data);
  }
}
