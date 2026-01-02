"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesList = getCategoriesList;
exports.registerCategory = registerCategory;
const categories_1 = __importDefault(require("../../../services/categories"));
const register_1 = __importDefault(require("../../../services/categories/register"));
async function getCategoriesList(_req, _res) {
    const categories = await new categories_1.default().getCategories();
    _res.json(categories);
}
async function registerCategory(_req, _res) {
    const data = _req.body;
    await new register_1.default().registerCategory(data);
    _res.json({});
}
