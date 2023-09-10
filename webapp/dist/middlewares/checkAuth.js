"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const path_1 = __importDefault(require("path"));
const CustomError_1 = require("../utils/CustomError");
require("dotenv").config({ path: path_1.default.join(__dirname, "..", ".env") });
function getSigningKeyPromise(kid, client) {
    return new Promise((resolve, reject) => {
        try {
            client.getSigningKey(kid, (err, key) => {
                try {
                    if (err) {
                        reject(err);
                    }
                    const signingKey = key.publicKey || key.rsaPublicKey;
                    resolve(signingKey);
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
const verifyToken = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedAndVerified = null;
    let parsed = jwt.decode(idToken, { complete: true });
    let kid = parsed.header.kid;
    const client = jwksClient({
        strictSsl: true,
        jwksUri: process.env.JWKS_CLIENT_URL,
    });
    let signingKey = yield getSigningKeyPromise(kid, client);
    try {
        decodedAndVerified = jwt.verify(idToken, signingKey);
    }
    catch (error) {
        const customError = new CustomError_1.CustomError("Token expired", 401, null);
        throw customError;
    }
    if (!decodedAndVerified) {
        throw Error("verification returned null");
    }
    return decodedAndVerified;
});
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedAndVerified = null;
    try {
        var auth = req.headers.authorization;
        let idToken = auth.substring(7);
        let result = yield verifyToken(idToken);
        if (!result) {
            const customError = new CustomError_1.CustomError("Invalid token", 401, result);
            return next(customError);
        }
        req.userData = result;
        next();
    }
    catch (err) {
        console.log(err);
        const customError = new CustomError_1.CustomError("Auth failed", 401, err);
        return next(customError);
    }
});
