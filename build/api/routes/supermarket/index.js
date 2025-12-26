"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const supermarket_1 = require("./supermarket");
exports.router.get("/", supermarket_1.getSupermarketList);
exports.router.post("/", supermarket_1.saveItem);
