"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchivesValidator = void 0;
const express_validator_1 = require("express-validator");
exports.getArchivesValidator = [
    (0, express_validator_1.query)('container')
        .notEmpty().withMessage('Container is required')
        .isString().withMessage('Container must be a string')
        .isLength({ max: 30 }).withMessage('Container should not exceed 30 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Container should only contain letters and spaces')
        .custom((value) => value.trim().length !== 0).withMessage('Container cannot be just whitespace'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];
