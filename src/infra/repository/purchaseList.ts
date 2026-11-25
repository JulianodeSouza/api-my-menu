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

      if (data.name !== undefined) itemToUpdate.name = data.name;
      if (data.quantity !== undefined && data.quantity !== null)
        itemToUpdate.quantity = Number(data.quantity);
      if (data.category !== undefined && data.category !== null)
        itemToUpdate.id_category = Number(data.category);
      if (data.measuredUnit !== undefined && data.measuredUnit !== null)
        itemToUpdate.id_measured_unit = Number(data.measuredUnit);
      if (data.totalCaught !== undefined && data.totalCaught !== null)
        itemToUpdate.totalCaught = Number(data.totalCaught);
      if (data.amount !== undefined && data.amount !== null)
        itemToUpdate.amount = Number(data.amount);
      if (data.checked !== undefined)
        itemToUpdate.checked = Boolean(data.checked);
      if (data.itemChecked !== undefined)
        itemToUpdate.checked = Boolean(data.itemChecked);
      if (data.active !== undefined) itemToUpdate.active = Boolean(data.active);
      if (data.finishDatePurchase !== undefined)
        itemToUpdate.finishDatePurchase = data.finishDatePurchase;

      return itemToUpdate;
    }

    const itemToSave: ListPurchaseEntity = ListPurchaseEntity.build();
    if (data.name !== undefined) itemToSave.name = data.name;
    if (data.quantity !== undefined && data.quantity !== null)
      itemToSave.quantity = Number(data.quantity);
    if (data.category !== undefined && data.category !== null)
      itemToSave.id_category = Number(data.category);
    if (data.measuredUnit !== undefined && data.measuredUnit !== null)
      itemToSave.id_measured_unit = Number(data.measuredUnit);
    if (data.totalCaught !== undefined && data.totalCaught !== null)
      itemToSave.totalCaught = Number(data.totalCaught);
    if (data.amount !== undefined && data.amount !== null)
      itemToSave.amount = Number(data.amount);
    if (data.checked !== undefined) itemToSave.checked = Boolean(data.checked);
    itemToSave.insert_datetime = new Date();

    return itemToSave;
  }
}
