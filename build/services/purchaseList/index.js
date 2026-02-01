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
            const categoryAlreadyExists = purchaseListByCategory.find((category) => category.category === item.categoryName);
            if (!categoryAlreadyExists) {
                const newCategory = {
                    category: item.categoryName,
                    categoryIcon: item.categoryIcon,
                    items: [this.formatItem(item)],
                };
                purchaseListByCategory.push(newCategory);
            }
            else {
                const index = purchaseListByCategory.findIndex((category) => category.category === item.categoryName);
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
    formatItem(item) {
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
exports.default = PurchaseListService;
