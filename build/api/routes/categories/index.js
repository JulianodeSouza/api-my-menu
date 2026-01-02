"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const categories_1 = require("./categories");
exports.router.get("/", categories_1.getCategoriesList);
exports.router.post("/", categories_1.registerCategory);
