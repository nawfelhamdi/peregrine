import 'reflect-metadata'
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler  from "./middlewares/errorHandler";
import { myDataSource } from "./config/ormconfig";
import routes from "./routes/index";
import { Request, Response } from "express";
import helmet  from "helmet"
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
 *  App Configuration
 */
app.use(helmet());
app.use(cors({origin: process.env.CORS_ALLOWED_ORIGIN_URL,optionsSuccessStatus: 200}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
});

