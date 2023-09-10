"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusMessages = {
    200: "The request has succeeded",
    201: "A new resource has been created",
    204: "No Content to be returned",
    400: "The request is invalid",
    401: "Not authorized",
    403: "You do not have permission",
    404: "The requested resource was not found",
    405: "Method not allowed for this resource",
    500: "Internal error occurred",
};
exports.default = statusMessages;
