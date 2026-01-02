"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchaseList_1 = __importDefault(require("../../../infra/repository/purchaseList"));
class PurchaseListDeleteProvider {
    async remove(idItem) {
        const supermarketRepository = new purchaseList_1.default();
        await supermarketRepository.removeRegister(idItem);
    }
}
exports.default = PurchaseListDeleteProvider;
