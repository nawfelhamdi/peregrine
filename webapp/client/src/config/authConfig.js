import { LogLevel } from "@azure/msal-browser";
export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AD_CLIENT_ID,
        authority: "https://login.microsoftonline.com/adb53b4f-b05f-4dcb-a2e1-9111380568c3", 
        redirectUri: "/", 
        postLogoutRedirectUri: "/", 
        clientCapabilities: ["CP1"]
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
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