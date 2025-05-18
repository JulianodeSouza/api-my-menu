import PurchaseListRepository from "@/infra/repository/purchaseList";

export default class PurchaseListDeleteProvider {
  async remove(idItem: number) {
    const supermarketRepository = new PurchaseListRepository();
    await supermarketRepository.removeRegister(idItem);
  }
}
