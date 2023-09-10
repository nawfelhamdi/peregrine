"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreparationPiplineStepsLogValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getPreparationPiplineStepsLogValidator = [
    (0, express_validator_1.param)('preparationPiplineLogId')
        .notEmpty().withMessage('Data Preparation Pipeline Log ID is required')
        .isInt().withMessage('Invalid Data Preparation Pipeline Log ID'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];
