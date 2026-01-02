"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorApi extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
    }
}
exports.default = ErrorApi;
