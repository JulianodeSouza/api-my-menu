import ErrorApi from "@/api/middlewares/errors";
import { IListPurchase, IListPurchaseView } from "@/types/listPurchase";
import PurchaseListProvider from "./provider";

export default class PurchaseListService {
  private provider: PurchaseListProvider;

  constructor() {
    this.provider = new PurchaseListProvider();
  }

  async getSupermarketList() {
    const items: IListPurchase[] = await this.provider.getListPurchase();

    const purchaseListByCategory: IListPurchaseView[] = [];
    for (const item of items) {
      const categoryAlreadyExists = purchaseListByCategory.find(
        (category) => category.category === item.category
      );

      if (!categoryAlreadyExists) {
        const newCategory: IListPurchaseView = {
          category: item.category,
          items: [item],
        };

        purchaseListByCategory.push(newCategory);
      } else {
        const index = purchaseListByCategory.findIndex(
          (category) => category.category === item.category
        );

        purchaseListByCategory[index].items.push(item);
      }
    }

    return purchaseListByCategory;
  }

  async getItemListById(idItem: number) {
    const item = await this.provider.getItemById(idItem);

    if (!item) {
      throw new ErrorApi("Item not found", 400);
    }

    return item;
  }
}
