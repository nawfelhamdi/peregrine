import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

export const authConfig = {
    credentials: {
        tenantID: process.env.API_AD_TENANT_ID,
        clientID: process.env.API_AD_CLIENT_ID
    },
    metadata: {
        authority: process.env.API_AD_AUTHORITY,
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
}


