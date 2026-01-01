"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMeasuredUnits = getAllMeasuredUnits;
const measuredUnits_1 = __importDefault(require("@/services/measuredUnits"));
async function getAllMeasuredUnits(_req, _res) {
    const measuredUnitsService = new measuredUnits_1.default();
    const measuredUnits = await measuredUnitsService.getAllMeasuredUnits();
    _res.json(measuredUnits);
}
