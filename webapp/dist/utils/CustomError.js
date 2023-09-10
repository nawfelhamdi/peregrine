"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const path_1 = __importDefault(require("path"));
const StatusMessages_1 = __importDefault(require("./StatusMessages"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
const environmentMode = process.env.NODE_ENV || "development";
class CustomError {
    constructor(message, status = 500, error = null) {
        var _a;
        if (environmentMode !== "development") {
            message = (_a = StatusMessages_1.default[status]) !== null && _a !== void 0 ? _a : "Internal error occurred";
            status = status;
            error = null;
        }
        this.message = message;
        this.status = status;
        this.error = error;
    }
}
exports.CustomError = CustomError;
