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
                    ["id", "id_category"],
                    ["name", "name"],
                ],
            },
            {
                model: measuredUnit_1.MeasuredUnitEntity,
                as: "measuredUnit",
                attributes: [
                    ["id", "id_measured_unit"],
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
        const itemFormatted = this.formatToSave(data, true);
        await this.update({
            model: listPurchase_1.ListPurchaseEntity,
            params: { id: idListPurchase },
            data: itemFormatted,
        });
    }
    async removeRegister(idListPurchase) {
        return await this.delete({
            model: listPurchase_1.ListPurchaseEntity,
            data: { active: false },
            params: { id: idListPurchase },
        });
    }
    formatToSave(data, isUpdate = false) {
        if (isUpdate) {
            const itemToUpdate = {};
            if (data.name)
                itemToUpdate.name = data.name;
            if (data.quantity)
                itemToUpdate.quantity = data.quantity;
            if (data.category)
                itemToUpdate.id_category = Number(data.category);
            if (data.measuredUnit)
                itemToUpdate.id_measured_unit = Number(data.measuredUnit);
            if (data.totalCaught !== undefined)
                itemToUpdate.totalCaught = data.totalCaught;
            if (data.amount !== undefined)
                itemToUpdate.amount = data.amount;
            if (data.checked !== undefined)
                itemToUpdate.checked = data.checked;
            if (data.itemChecked !== undefined)
                itemToUpdate.checked = data.itemChecked;
            if (data.active !== undefined)
                itemToUpdate.active = data.active;
            return itemToUpdate;
        }
        const itemToSave = listPurchase_1.ListPurchaseEntity.build();
        console.log("#### data: ", data);
        if (data.name)
            itemToSave.name = data.name;
        if (data.quantity)
            itemToSave.quantity = data.quantity;
        if (data.category)
            itemToSave.id_category = Number(data.category);
        if (data.measuredUnit)
            itemToSave.id_measured_unit = Number(data.measuredUnit);
        if (data.totalCaught)
            itemToSave.totalCaught = data.totalCaught;
        if (data.amount)
            itemToSave.amount = data.amount;
        if (data.checked)
            itemToSave.checked = data.checked;
        itemToSave.insert_datetime = new Date();
        return itemToSave;
    }
}
exports.default = PurchaseListRepository;
