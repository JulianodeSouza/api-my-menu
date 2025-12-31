import { IListPurchase } from "@/types/listPurchase";
import { CategoryEntity } from "../models/category";
import RepositoryModel from "./repository";
import { ICategories } from "@/types/categories";

export default class CategoriesRepository extends RepositoryModel {
  async getAllCategories(): Promise<ICategories[]> {
    const categories = await this.getAll<ICategories>({
      model: CategoryEntity,
    });

    return categories;
  }

  async register(data: ICategories): Promise<void> {
    const itemFormatted = this.formatToSave(data);

    await this.save({
      model: itemFormatted,
    });
  }

  private formatToSave(
    data: ICategories,
    isUpdate: boolean = false
  ): CategoryEntity {
    const itemToSave: CategoryEntity = CategoryEntity.build({
      name: data.name,
    });

    if (!isUpdate) {
      itemToSave.insert_datetime = new Date();
    }

    return itemToSave;
  }
}
