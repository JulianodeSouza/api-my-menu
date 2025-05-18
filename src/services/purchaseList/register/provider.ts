import PurchaseListRepository from "@/infra/repository/purchaseList";
import { IListPurchase } from "@/types/listPurchase";

export default class PurchaseListRegisterProvider {
  async registerItem(data: IListPurchase) {
    const supermarketRepository = new PurchaseListRepository();
    await supermarketRepository.register(data);
  }
}
