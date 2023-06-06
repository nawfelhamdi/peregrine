"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, status = 500, devModeMessage = {}) {
        this.message = message;
        this.status = status;
        this.devModeMessage = devModeMessage;
    }
}
exports.CustomError = CustomError;
