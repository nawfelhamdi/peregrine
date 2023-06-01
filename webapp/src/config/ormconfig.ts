const Connection = require('tedious').Connection;
import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
  type:"mssql",
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password:process.env.DATABASE_PASSWORD,
  // schema:"hck",
  entities:[path.join(__dirname, "..", "entities", "*.{ts,js}")],
  options: {
  encrypt: true,
  },
  synchronize: false,
  logging: false,
});

