"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("../../infra/repository/categories"));
const defaultProvider_1 = __importDefault(require("../system/defaultProvider"));
class CategoriesProvider extends defaultProvider_1.default {
    getAllCategories() {
        const repositoryCategories = new categories_1.default();
        const categories = repositoryCategories.getAllCategories();
        return categories;
    }
}
exports.default = CategoriesProvider;
