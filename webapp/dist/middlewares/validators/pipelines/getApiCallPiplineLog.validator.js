"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiCallPiplineLogValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getApiCallPiplineLogValidator = [
    (0, express_validator_1.param)('projectId')
        .notEmpty().withMessage('Project ID is required')
        .isInt().withMessage('Invalid Project ID'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];
