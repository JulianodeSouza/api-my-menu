"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../models/category");
const listPurchase_1 = require("../models/listPurchase");
const measuredUnit_1 = require("../models/measuredUnit");
const repository_1 = __importDefault(require("./repository"));
class PurchaseListRepository extends repository_1.default {
    async getAllListPurchase(params) {
        const includes = [
            {
                model: category_1.CategoryEntity,
                as: "category",
                attributes: [
                    ["id", "idCategory"],
                    ["name", "name"],
                ],
            },
            {
                model: measuredUnit_1.MeasuredUnitEntity,
                as: "measuredUnit",
                attributes: [
                    ["id", "idMeasuredUnit"],
                    ["name", "measuredUnit"],
                ],
            },
        ];
        const itemsList = await this.getAll({
            model: listPurchase_1.ListPurchaseEntity,
            params,
            includes,
        });
        return itemsList;
    }
    async getOneItem(params) {
        const includes = [
            {
                model: category_1.CategoryEntity,
                as: "category",
                attributes: ["id", "name"],
            },
            {
                model: measuredUnit_1.MeasuredUnitEntity,
                as: "measuredUnit",
                attributes: ["id", "name"],
            },
        ];
        const itemList = await this.getOne({
            model: listPurchase_1.ListPurchaseEntity,
            params,
            includes,
        });
        return itemList;
    }
    async register(data) {
        const itemFormatted = this.formatToSave(data);
        await this.save({
            model: itemFormatted,
        });
    }
    async updateRegister(idListPurchase, data) {
        const itemFormatted = this.formatToSave(data);
        return await this.update({
            model: listPurchase_1.ListPurchaseEntity,
            params: { id: idListPurchase },
            data: itemFormatted,
        });
    }
    async removeRegister(idListPurchase) {
        return await this.delete({
            model: listPurchase_1.ListPurchaseEntity,
            params: { id: idListPurchase },
        });
    }
    formatToSave(data, isUpdate = false) {
        const itemToSave = listPurchase_1.ListPurchaseEntity.build({
            name: data.name,
            quantity: data.quantity,
            idCategory: data.category,
            idMeasuredUnit: data.measuredUnit,
            totalCaught: data.totalCaught || 0,
            amount: data.amount || 0,
            checked: data.checked || false,
        });
        if (!isUpdate) {
            itemToSave.insertDatetime = new Date();
        }
        return itemToSave;
    }
}
exports.default = PurchaseListRepository;
