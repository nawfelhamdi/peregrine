"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const Connection = require('tedious').Connection;
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    // schema:"hck",
    entities: [path_1.default.join(__dirname, "..", "entities", "*.{ts,js}")],
    options: {
        encrypt: true,
    },
    synchronize: false,
    logging: false,
});
