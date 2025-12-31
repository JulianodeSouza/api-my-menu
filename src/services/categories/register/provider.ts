import CategoriesRepository from "@/infra/repository/categories";
import PurchaseListRepository from "@/infra/repository/purchaseList";
import { ICategories } from "@/types/categories";
import { IListPurchase } from "@/types/listPurchase";

export default class CategoriesRegisterProvider {
  async registerCategory(data: ICategories) {
    const categoriesRepository = new CategoriesRepository();
    await categoriesRepository.register(data);
  }
}
