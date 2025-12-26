"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const error_handler_1 = require("./middlewares/error-handler");
const supermarket_1 = require("./routes/supermarket");
exports.router = (0, express_1.Router)();
exports.router.use((_req, _res, next) => {
    _res.header("Access-Control-Allow-Origin", "*");
    _res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    next();
});
exports.router.use("/list-supermarket", supermarket_1.router);
exports.router.use("/list-supermarket", error_handler_1.errorHandler);
