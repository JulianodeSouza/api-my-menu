"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchaseList_1 = __importDefault(require("../../infra/repository/purchaseList"));
const defaultProvider_1 = __importDefault(require("../system/defaultProvider"));
class PurchaseListProvider extends defaultProvider_1.default {
    async getListPurchase() {
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
    async getItemById(idItem) {
        const supermarketRepository = new purchaseList_1.default();
        const itemListPurchase = await supermarketRepository.getOneItem({
            id: idItem,
        });
        return itemListPurchase;
    }
}
exports.default = PurchaseListProvider;
