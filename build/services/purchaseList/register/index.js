"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("@/api/middlewares/errors"));
const provider_1 = __importDefault(require("./provider"));
class PurchaseListRegisterService {
    constructor() {
        this.provider = new provider_1.default();
    }
    async registerItem(data) {
        const validateData = await this.validateData(data);
        if (!validateData) {
            throw new errors_1.default("Dados inválidos", 400);
        }
        await this.provider.registerItem(data);
    }
    validateData(data) {
        const { name, quantity } = data;
        if (!name || !quantity) {
            return false;
        }
        if (typeof quantity !== "number" || typeof name !== "string") {
            return false;
        }
        return true;
    }
}
exports.default = PurchaseListRegisterService;
