"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../../../api/middlewares/errors"));
const provider_1 = __importDefault(require("./provider"));
class CategoriesRegisterService {
    constructor() {
        this.provider = new provider_1.default();
    }
    async registerCategory(data) {
        const validateData = await this.validateData(data);
        if (!validateData) {
            throw new errors_1.default("Dados inválidos", 400);
        }
        await this.provider.registerCategory(data);
    }
    validateData(data) {
        const { name } = data;
        if (!name) {
            return false;
        }
        if (typeof name !== "string") {
            return false;
        }
        return true;
    }
}
exports.default = CategoriesRegisterService;
