"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../models/category");
const repository_1 = __importDefault(require("./repository"));
class CategoriesRepository extends repository_1.default {
    async getAllCategories() {
        const categories = await this.getAll({
            model: category_1.CategoryEntity,
        });
        return categories;
    }
    async register(data) {
        const itemFormatted = this.formatToSave(data);
        await this.save({
            model: itemFormatted,
        });
    }
    formatToSave(data, isUpdate = false) {
        const itemToSave = category_1.CategoryEntity.build({
            name: data.name,
            icon: data.icon,
        });
        if (!isUpdate) {
            itemToSave.insert_datetime = new Date();
        }
        return itemToSave;
    }
}
exports.default = CategoriesRepository;
