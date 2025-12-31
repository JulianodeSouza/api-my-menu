import { IListPurchase } from "@/types/listPurchase";
import { CategoryEntity } from "../models/category";
import { ListPurchaseEntity } from "../models/listPurchase";
import { MeasuredUnitEntity } from "../models/measuredUnit";
import RepositoryModel from "./repository";

type SupermarketParams = {
  [key in keyof ListPurchaseEntity]?: any;
};

export default class PurchaseListRepository extends RepositoryModel {
  async getAllListPurchase(
    params?: SupermarketParams
  ): Promise<IListPurchase[]> {
    const includes = [
      {
        model: CategoryEntity,
        as: "category",
        attributes: [
          ["id", "id_category"],
          ["name", "name"],
        ],
      },
      {
        model: MeasuredUnitEntity,
        as: "measuredUnit",
        attributes: [
          ["id", "id_measured_unit"],
          ["name", "measuredUnit"],
        ],
      },
    ];

    const itemsList = await this.getAll<IListPurchase>({
      model: ListPurchaseEntity,
      params,
      includes,
    });

    return itemsList;
  }

  async getOneItem(params?: SupermarketParams): Promise<IListPurchase | null> {
    const includes = [
      {
        model: CategoryEntity,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: MeasuredUnitEntity,
        as: "measuredUnit",
        attributes: ["id", "name"],
      },
    ];

    const itemList = await this.getOne<IListPurchase>({
      model: ListPurchaseEntity,
      params,
      includes,
    });

    return itemList;
  }

  async register(data: IListPurchase): Promise<void> {
    const itemFormatted = this.formatToSave(data);

    await this.save({
      model: itemFormatted,
    });
  }

  async updateRegister(
    idListPurchase: number,
    data: IListPurchase
  ): Promise<void> {
    const itemFormatted = this.formatToSave(data);

    return await this.update({
      model: ListPurchaseEntity,
      params: { id: idListPurchase },
      data: itemFormatted,
    });
  }

  async removeRegister(idListPurchase: number) {
    return await this.delete({
      model: ListPurchaseEntity,
      data: { active: false },
      params: { id: idListPurchase },
    });
  }

  private formatToSave(
    data: IListPurchase,
    isUpdate: boolean = false
  ): ListPurchaseEntity {
    const itemToSave: ListPurchaseEntity = ListPurchaseEntity.build({
      name: data.name,
      quantity: data.quantity,
      id_category: data.category,
      id_measured_unit: data.measuredUnit,
      totalCaught: data.totalCaught || 0,
      amount: data.amount || 0,
      checked: data.checked || false,
    });

    if (!isUpdate) {
      itemToSave.insert_datetime = new Date();
    }

    return itemToSave;
  }
}
