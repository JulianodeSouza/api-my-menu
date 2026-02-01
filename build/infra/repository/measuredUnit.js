"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("./repository"));
const measuredUnit_1 = require("../models/measuredUnit");
class MeasuredUnitRepository extends repository_1.default {
    async getAllMeasuredUnits() {
        const measuredUnits = await this.getAll({
            model: measuredUnit_1.MeasuredUnitEntity,
        });
        return measuredUnits;
    }
}
exports.default = MeasuredUnitRepository;
