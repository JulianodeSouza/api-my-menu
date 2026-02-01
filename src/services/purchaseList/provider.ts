import PurchaseListRepository from "@/infra/repository/purchaseList";
import { IListPurchase } from "@/types/listPurchase";
import DefaultProvider from "../system/defaultProvider";

export default class PurchaseListProvider extends DefaultProvider {
  async getListPurchase(): Promise<IListPurchase[]> {
    const sql = `
      select  
      lp.id as id,
      lp.name as name,
      lp.quantity as quantity,
      lp.id_category as category,
      lp.id_measured_unit as measuredUnit,
      lp.active,
      lp.totalCaught,
      lp.amount,
      lp.checked,
      c.name as categoryName,
      c.icon as categoryIcon,
      mu.name as measuredUnitName,
      mu.unit_symbol as unitSymbol
      from list_purchase lp
      inner join category c on lp.id_category = c.id
      inner join measured_unit mu on lp.id_measured_unit = mu.id
      where lp.active = 1
      and lp.finish_date_purchase is null
      order by c.name, lp.name`;

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
