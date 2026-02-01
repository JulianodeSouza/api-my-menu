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
    params?: SupermarketParams,
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
    data: Partial<IListPurchase>,
  ): Promise<void> {
    const itemFormatted = this.formatToSave(data, true);

    await this.update({
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
    data: Partial<IListPurchase> & { itemChecked?: boolean },
    isUpdate: boolean = false,
  ): ListPurchaseEntity | Partial<ListPurchaseEntity> {
    if (isUpdate) {
      const itemToUpdate: Partial<ListPurchaseEntity> = {};

      if (data.name) itemToUpdate.name = data.name;
      if (data.quantity) itemToUpdate.quantity = data.quantity;
      if (data.category) itemToUpdate.id_category = Number(data.category);
      if (data.measuredUnit)
        itemToUpdate.id_measured_unit = Number(data.measuredUnit);
      if (data.totalCaught !== undefined)
        itemToUpdate.totalCaught = data.totalCaught;
      if (data.amount !== undefined) itemToUpdate.amount = data.amount;
      if (data.checked !== undefined) itemToUpdate.checked = data.checked;
      if (data.itemChecked !== undefined)
        itemToUpdate.checked = data.itemChecked;
      if (data.active !== undefined) itemToUpdate.active = data.active;

      return itemToUpdate;
    }

    const itemToSave: ListPurchaseEntity = ListPurchaseEntity.build();

    console.log("#### data: ", data);

    if (data.name) itemToSave.name = data.name;
    if (data.quantity) itemToSave.quantity = data.quantity;
    if (data.category) itemToSave.id_category = Number(data.category);
    if (data.measuredUnit)
      itemToSave.id_measured_unit = Number(data.measuredUnit);
    if (data.totalCaught) itemToSave.totalCaught = data.totalCaught;
    if (data.amount) itemToSave.amount = data.amount;
    if (data.checked) itemToSave.checked = data.checked;
    itemToSave.insert_datetime = new Date();

    return itemToSave;
  }
}
