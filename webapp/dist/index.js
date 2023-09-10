"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const ormconfig_1 = require("./config/ormconfig");
const index_1 = __importDefault(require("./routes/index"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
/**
 *  Database connection
 */
ormconfig_1.myDataSource
    .initialize()
    .then(() => {
    console.log(`Data Source has been connected`);
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
/**
 * App Variables
 */
const app = (0, express_1.default)();
/**
 *  App Configuration
 */
app.use((0, cors_1.default)({ origin: process.env.CORS_ALLOWED_ORIGIN_URL, optionsSuccessStatus: 200 }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 *  loading the api routes
 */
app.use("/", index_1.default);
/**
 *  loading the frontend in prod mode
 */
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static("./client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
/**
 * Setup error handler middleware
 */
app.use(errorHandler_1.default);
/**
 * Server Activation
 */
function normalizePort(val) {
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
