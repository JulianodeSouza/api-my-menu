import PurchaseListDeleteProvider from "./provider";

export default class PurchaseListDeleteService {
  private provider: PurchaseListDeleteProvider;

  constructor() {
    this.provider = new PurchaseListDeleteProvider();
  }

  async removeItem(idItem: number) {
    await this.provider.remove(idItem);
  }
}
