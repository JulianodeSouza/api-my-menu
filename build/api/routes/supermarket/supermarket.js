"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupermarketList = getSupermarketList;
exports.getItemOfListById = getItemOfListById;
exports.saveItem = saveItem;
exports.markItem = markItem;
exports.finishPurchase = finishPurchase;
exports.removeItem = removeItem;
const purchaseList_1 = __importDefault(require("@/services/purchaseList"));
const delete_1 = __importDefault(require("@/services/purchaseList/delete"));
const register_1 = __importDefault(require("@/services/purchaseList/register"));
async function getSupermarketList(_req, _res) {
    const serviceListPurchase = new purchaseList_1.default();
    const listPurchase = await serviceListPurchase.getSupermarketList();
    _res.json(listPurchase);
}
async function getItemOfListById(_req, _res) {
    const idItem = Number(_req.params.id);
    const serviceListPurchase = new purchaseList_1.default();
    const item = await serviceListPurchase.getItemListById(idItem);
    _res.json(item);
}
async function saveItem(_req, _res) {
    const data = _req.body;
    await new register_1.default().registerItem(data);
    _res.json({});
}
async function markItem(_req, _res) {
    const idItem = Number(_req.params.id);
    const data = _req.body;
    await new register_1.default().markItem(idItem, data);
    _res.json({});
}
async function finishPurchase(_req, _res) {
    await new register_1.default().finishPurchase();
    _res.json({});
}
async function removeItem(_req, _res) {
    const idItem = Number(_req.params.id);
    await new delete_1.default().removeItem(idItem);
    _res.json({});
}
