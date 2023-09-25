"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", ".env") });
function checkAuth(req, res, next) {
    passport_1.default.authenticate('oauth-bearer', {
        session: false,
    }, (err, user, info) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (info) {
            req.authInfo = info;
            return next();
        }
    })(req, res, next);
}
exports.default = checkAuth;
