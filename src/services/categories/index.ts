import { ICategories } from "@/types/categories";
import CategoriesProvider from "./provider";

export default class CategoriesService extends CategoriesProvider {
  private provider: CategoriesProvider;

  constructor() {
    super();
    this.provider = new CategoriesProvider();
  }

  async getCategories(): Promise<ICategories[]> {
    const categories = await this.provider.getAllCategories();
    return categories;
  }
}
