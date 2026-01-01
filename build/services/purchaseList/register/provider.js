"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchaseList_1 = __importDefault(require("@/infra/repository/purchaseList"));
class PurchaseListRegisterProvider {
    async registerItem(data) {
        const supermarketRepository = new purchaseList_1.default();
        await supermarketRepository.register(data);
    }
    async markItem(idItem, data) {
        const supermarketRepository = new purchaseList_1.default();
        await supermarketRepository.updateRegister(idItem, data);
    }
    async finishPurchase() {
        const supermarketRepository = new purchaseList_1.default();
        const allItensActives = await supermarketRepository.getAllListPurchase({
            active: true,
        });
        for (const item of allItensActives) {
            await supermarketRepository.updateRegister(item.id, { active: false });
        }
    }
}
exports.default = PurchaseListRegisterProvider;
