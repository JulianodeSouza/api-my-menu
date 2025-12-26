"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupermarketList = getSupermarketList;
exports.saveItem = saveItem;
const purchaseList_1 = __importDefault(require("@/services/purchaseList"));
const register_1 = __importDefault(require("@/services/purchaseList/register"));
async function getSupermarketList(_req, _res) {
    const listPurchase = await new purchaseList_1.default().getSupermarketList();
    _res.json(listPurchase);
}
async function saveItem(_req, _res) {
    const data = _req.body;
    await new register_1.default().registerItem(data);
    _res.json({});
}
