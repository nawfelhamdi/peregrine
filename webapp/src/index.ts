import 'reflect-metadata'
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler  from "./middlewares/errorHandler";
import { myDataSource } from "./config/ormconfig";
import routes from "./routes/index";
import { Request, Response } from "express";
import helmet from "helmet"
import passport from 'passport';
import passportAzureAd from 'passport-azure-ad';
import {authConfig} from './config/authConfig';

require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });


/**
 *  Database connection
 */
myDataSource
    .initialize()
    .then(() => {
        console.log(`Data Source has been connected`)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

/**
 * App Variables
 */

const app = express();

/**
 *  App middelewares Configurations
 */
app.use(helmet());
const allowedOrigins = [process.env.CORS_ALLOWED_ORIGIN_URL];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 *  Auth configurations
 */
const bearerStrategy = new passportAzureAd.BearerStrategy({
    identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
    issuer: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}`,
    clientID: authConfig.credentials.clientID,
    audience: authConfig.credentials.clientID,
    validateIssuer: authConfig.settings.validateIssuer,
    passReqToCallback: authConfig.settings.passReqToCallback,
    loggingLevel: process.env.NODE_ENV === "development"? authConfig.settings.loggingLevel: null,
    loggingNoPII: authConfig.settings.loggingNoPII,
}, (req, token, done) => {
  if (!token.hasOwnProperty('scp') && !token.hasOwnProperty('roles')) {
        return done(new Error('Unauthorized'), null, "No delegated or app permission claims found");
    }
    return done(null, {}, token);
});

app.use(passport.initialize());

passport.use(bearerStrategy);

/**
 *  loading the api routes
 */
 app.use("/", routes);

/**
 *  loading the frontend in prod mode
 */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("./client/build"));
  app.get("*", (req:Request, res:Response) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  }
/**
 * Setup error handler middleware
 */
 app.use(errorHandler);

/**
 * Server Activation
 */
 function normalizePort(val:any) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

var port = normalizePort(process.env.PORT || '8080');
app.listen(port, () => {
  console.log(`Server is runinng at: http://localhost:${port}`);
})
