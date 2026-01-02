"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const measuredUnits_1 = require("./measuredUnits");
exports.router = (0, express_1.Router)();
exports.router.get("/", measuredUnits_1.getAllMeasuredUnits);
