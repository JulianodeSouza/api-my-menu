import PurchaseListRepository from "@/infra/repository/purchaseList";
import { IListPurchase } from "@/types/listPurchase";

export default class PurchaseEditProvider {
  async editItem(idItem: number, data: IListPurchase): Promise<void> {
    const supermarketRepository = new PurchaseListRepository();
    await supermarketRepository.updateRegister(idItem, data);
  }

  
}
