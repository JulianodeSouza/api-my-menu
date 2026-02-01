"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = __importDefault(require("./provider"));
class CategoriesService extends provider_1.default {
    constructor() {
        super();
        this.provider = new provider_1.default();
    }
    async getCategories() {
        const categories = await this.provider.getAllCategories();
        return categories;
    }
}
exports.default = CategoriesService;
