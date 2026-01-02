"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const measuredUnit_1 = __importDefault(require("../../infra/repository/measuredUnit"));
const defaultProvider_1 = __importDefault(require("../system/defaultProvider"));
class MeasuredUnitsProvider extends defaultProvider_1.default {
    async getAllMeasuredUnits() {
        const measuredUnitRepository = new measuredUnit_1.default();
        const measuredUnits = await measuredUnitRepository.getAllMeasuredUnits();
        return measuredUnits;
    }
}
exports.default = MeasuredUnitsProvider;
