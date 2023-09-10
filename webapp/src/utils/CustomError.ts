import path from "path";
import statusMessages from "./StatusMessages";

require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const environmentMode = process.env.NODE_ENV || "development";

export class CustomError {
  message!: string;
  status!: number;
  error!: any;

  constructor(message: string, status: number = 500, error: any = null) {
    if (environmentMode !== "development") {
      message = statusMessages[status] ?? "Internal error occurred"
      status = status;
      error = null;
    }

    this.message = message;
    this.status = status;
    this.error = error;
  }
}