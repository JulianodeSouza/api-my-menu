"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../../../services/utils");
const errorHandler = (error, req, res, next) => {
    (0, utils_1.logMessage)(error);
    const message = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        data: {
            message,
        },
    });
};
exports.errorHandler = errorHandler;
