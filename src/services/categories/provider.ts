import CategoriesRepository from "@/infra/repository/categories";
import DefaultProvider from "../system/defaultProvider";
import { ICategories } from "@/types/categories";

export default class CategoriesProvider extends DefaultProvider {
  async getAllCategories(): Promise<ICategories[]> {
    const repositoryCategories = new CategoriesRepository();

    const categories = await repositoryCategories.getAllCategories();
    return categories;
  }
}
