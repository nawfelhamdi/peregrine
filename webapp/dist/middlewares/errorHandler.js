"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../utils/CustomError");
function handleError(err, req, res, next) {
    let customError = err;
    if (!(err instanceof CustomError_1.CustomError)) {
        customError = new CustomError_1.CustomError('error');
    }
    res.status(customError.status).send(customError);
}
;
exports.default = handleError;
