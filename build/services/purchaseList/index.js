"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../../api/middlewares/errors"));
const provider_1 = __importDefault(require("./provider"));
class PurchaseListService {
    constructor() {
        this.provider = new provider_1.default();
    }
    async getSupermarketList() {
        const items = await this.provider.getListPurchase();
        const purchaseListByCategory = [];
        for (const item of items) {
            const categoryAlreadyExists = purchaseListByCategory.find((category) => category.category === item.category);
            if (!categoryAlreadyExists) {
                const newCategory = {
                    category: item.category,
                    items: [item],
                };
                purchaseListByCategory.push(newCategory);
            }
            else {
                const index = purchaseListByCategory.findIndex((category) => category.category === item.category);
                purchaseListByCategory[index].items.push(item);
            }
        }
        return purchaseListByCategory;
    }
    async getItemListById(idItem) {
        const item = await this.provider.getItemById(idItem);
        if (!item) {
            throw new errors_1.default("Item not found", 400);
        }
        return item;
    }
}
exports.default = PurchaseListService;
