export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AD_CLIENT_ID,
    authority: process.env.REACT_APP_AD_AUTHORITY,
    redirectUri: process.env.REACT_APP_AD_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage', 
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ['User.Read'],
};