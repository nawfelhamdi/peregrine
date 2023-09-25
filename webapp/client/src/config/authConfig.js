import { LogLevel } from "@azure/msal-browser";
export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AD_CLIENT_ID,
        authority: process.env.REACT_APP_AD_AUTHORITY, 
        redirectUri: "/", 
        postLogoutRedirectUri: "/", 
        clientCapabilities: ["CP1"]
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (process.env.REACT_APP_NODE_ENV !== "developement") {
                    return
                }
                if (containsPii) {
                    return;
                }

                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const protectedResources = {
    api: {
        endpoint: "http://localhost:8081/api",
        scopes: {
            read: [ `api://${process.env.REACT_APP_API_AD_CLIENT_ID}/api.Read` ],
            write: [`api://${process.env.REACT_APP_API_AD_CLIENT_ID}/api.ReadWrite` ]
        }
    }
}

export const loginRequest = {
    scopes: [...protectedResources.api.scopes.read, ...protectedResources.api.scopes.write]
};