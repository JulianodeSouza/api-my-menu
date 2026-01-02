"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = __importDefault(require("./provider"));
class MeasuredUnitsService {
    constructor() {
        this.provider = new provider_1.default();
    }
    getAllMeasuredUnits() {
        const measuredUnits = this.provider.getAllMeasuredUnits();
        if (!measuredUnits) {
            throw new Error("No measured units found");
        }
        return measuredUnits;
    }
}
exports.default = MeasuredUnitsService;
