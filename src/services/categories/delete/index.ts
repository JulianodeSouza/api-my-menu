import ErrorApi from "@/api/middlewares/errors";
import CategoriesDeleteProvider from "./provider";

export default class CategoriesDeleteService {
  private provider: CategoriesDeleteProvider;

  constructor() {
    this.provider = new CategoriesDeleteProvider();
  }

  async removeCategory(idCategory: number): Promise<void> {
    if (!idCategory) {
      throw new ErrorApi("Categoria inválida", 400);
    }

    await this.provider.removeCategory(idCategory);
  }
}
