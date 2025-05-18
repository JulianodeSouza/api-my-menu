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
          ["id", "idCategory"],
          ["name", "name"],
        ],
      },
      {
        model: MeasuredUnitEntity,
        as: "measuredUnit",
        attributes: [
          ["id", "idMeasuredUnit"],
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
      idCategory: data.category,
      idMeasuredUnit: data.measuredUnit,
      totalCaught: data.totalCaught || 0,
      amount: data.amount || 0,
      checked: data.checked || false,
    });

    if (!isUpdate) {
      itemToSave.insertDatetime = new Date();
    }

    return itemToSave;
  }
}
