import PurchaseListRepository from "@/infra/repository/purchaseList";
import { ICheckedData, IListPurchase } from "@/types/listPurchase";

export default class PurchaseListRegisterProvider {
  async registerItem(data: IListPurchase): Promise<void> {
    const supermarketRepository = new PurchaseListRepository();
    await supermarketRepository.register(data);
  }

  async markItem(idItem: number, data: ICheckedData): Promise<void> {
    const supermarketRepository = new PurchaseListRepository();
    await supermarketRepository.updateRegister(idItem, data);
  }

  async finishPurchase(): Promise<void> {
    const supermarketRepository = new PurchaseListRepository();

    const allItensActives = await supermarketRepository.getAllListPurchase({
      active: true,
    });

    for (const item of allItensActives) {
      await supermarketRepository.updateRegister(item.id, { active: false });
    }
  }
}
