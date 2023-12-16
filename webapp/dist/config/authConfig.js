"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
exports.authConfig = {
    credentials: {
        tenantID: process.env.API_AD_TENANT_ID,
        clientID: process.env.API_AD_CLIENT_ID
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0"
    },
    settings: {
        validateIssuer: true,
        passReqToCallback: true,
        loggingLevel: "info",
        loggingNoPII: process.env.NODE_ENV === "development",
    },
    protectedRoutes: {
        api: {
            endpoint: "/api",
            delegatedPermissions: {
                read: ["api.Read", "api.ReadWrite"],
                write: ["api.ReadWrite"]
            },
            applicationPermissions: {
                read: ["api.Read.All", "api.ReadWrite.All"],
                write: ["api.ReadWrite.All"]
            }
        }
    }
};
