"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiCallPiplineStepsLogValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getApiCallPiplineStepsLogValidator = [
    (0, express_validator_1.param)('apiCallPiplineLogId')
        .notEmpty().withMessage('API Call Pipeline Log ID is required')
        .isInt().withMessage('Invalid API Call Pipeline Log ID'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];
