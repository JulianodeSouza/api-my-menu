import PurchaseListRepository from "@/infra/repository/purchaseList";
import { IListPurchase } from "@/types/listPurchase";
import DefaultProvider from "../system/defaultProvider";

export default class PurchaseListProvider extends DefaultProvider {
  async getListPurchase(): Promise<IListPurchase[]> {
    const sql = `
      select lp.*,
      c.name as category,
      mu.name as measuredUnit
      from list_purchase lp
      inner join category c on lp.idCategory = c.id
      inner join measured_unit mu on lp.idMeasuredUnit = mu.id`;

    const listPurchase = await this.getAll(sql);
    return listPurchase;
  }

  async getItemById(idItem: number) {
    const supermarketRepository = new PurchaseListRepository();
    const itemListPurchase = await supermarketRepository.getOneItem({
      id: idItem,
    });

    return itemListPurchase;
  }
}
