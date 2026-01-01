"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("@/infra/models"));
const sequelize_1 = require("sequelize");
class DefaultProvider {
    async getAll(sql, replacements) {
        const result = await models_1.default.query(sql, {
            replacements,
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result;
    }
    async getOne(sql, replacements) {
        const result = await models_1.default.query(sql, {
            replacements,
            type: sequelize_1.QueryTypes.SELECT,
        });
        return result[0];
    }
}
exports.default = DefaultProvider;
