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
        (category) => category.category === item.categoryName,
      );

      if (!categoryAlreadyExists) {
        const newCategory: IListPurchaseView = {
          category: item.categoryName,
          categoryIcon: item.categoryIcon,
          items: [this.formatItem(item)],
        };

        purchaseListByCategory.push(newCategory);
      } else {
        const index = purchaseListByCategory.findIndex(
          (category) => category.category === item.categoryName,
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

  private formatItem(item: IListPurchase): IListPurchase {
    return {
      id: item.id,
      name: item.name,
      quantity: Number(item.quantity),
      category: item.category,
      categoryName: item.categoryName,
      categoryIcon: item.categoryIcon,
      measuredUnitName: item.measuredUnitName,
      measuredUnit: item.measuredUnit,
      unitSymbol: item.unitSymbol,
      active: !!item.active,
      totalCaught: Number(item.totalCaught),
      amount: Number(item.amount),
      checked: !!item.checked,
    };
  }
}
