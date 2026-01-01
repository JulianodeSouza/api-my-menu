"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("@/infra/repository/categories"));
class CategoriesRegisterProvider {
    async registerCategory(data) {
        const categoriesRepository = new categories_1.default();
        await categoriesRepository.register(data);
    }
}
exports.default = CategoriesRegisterProvider;
