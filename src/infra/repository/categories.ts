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

  async updateRegister(
    idCategory: number,
    data: Partial<ICategories>,
  ): Promise<void> {
    await this.update({
      model: CategoryEntity,
      params: { id: idCategory },
      data: this.formatToUpdate(data),
    });
  }

  async removeRegister(idCategory: number): Promise<void> {
    await this.remove({
      model: CategoryEntity,
      params: { id: idCategory },
    });
  }

  private formatToSave(
    data: ICategories,
    isUpdate: boolean = false,
  ): CategoryEntity {
    const itemToSave: CategoryEntity = CategoryEntity.build({
      name: data.name,
      icon: data.icon,
    });

    if (!isUpdate) {
      itemToSave.insert_datetime = new Date();
    }

    return itemToSave;
  }

  private formatToUpdate(data: Partial<ICategories>): Partial<CategoryEntity> {
    const itemToUpdate: Partial<CategoryEntity> = {};

    if (data.name !== undefined) itemToUpdate.name = data.name;
    if (data.icon !== undefined) itemToUpdate.icon = data.icon;

    return itemToUpdate;
  }
}
