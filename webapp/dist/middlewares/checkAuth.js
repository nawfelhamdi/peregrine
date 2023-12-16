"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const CustomError_1 = require("../utils/CustomError");
const passport_1 = __importDefault(require("passport"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", ".env") });
function checkAuth(req, res, next) {
    passport_1.default.authenticate('oauth-bearer', {
        session: false,
    }, (err, user, info) => {
        if (err) {
            const customError = new CustomError_1.CustomError("Passport error", 401, err);
            return next(customError);
        }
        if (!user) {
            const customError = new CustomError_1.CustomError("Unauthorized", 401, err);
            return next(customError);
        }
        if (info) {
            req.authInfo = info;
            return next();
        }
    })(req, res, next);
}
exports.default = checkAuth;
