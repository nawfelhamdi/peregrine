"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectValidator = void 0;
const express_validator_1 = require("express-validator");
const isLastDateOfMonth = (value) => {
    const date = new Date(value);
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    nextMonth.setDate(0);
    return date.getTime() === nextMonth.getTime();
};
const isAfterStartDate = (endDate, startDate) => {
    const dayAfter = new Date(new Date(startDate).getTime() + 86400000);
    return new Date(endDate) >= dayAfter;
};
const isValidDate = (value) => {
    return new Date(value) <= new Date();
};
exports.createProjectValidator = [
    (0, express_validator_1.body)('project_name').notEmpty().withMessage('Project name is required')
        .isString().withMessage('project_name must be a string')
        .custom((value) => value.trim().length !== 0).withMessage('project_name cannot be just whitespace'),
    (0, express_validator_1.body)('measurement_model')
        .notEmpty().withMessage('Measurement model is required')
        .isIn(['PAA', 'GMM']).withMessage('Measurement model must be either "PAA" or "GMM"'),
    (0, express_validator_1.body)('start_date')
        .notEmpty().withMessage('Start date is required')
        .isDate().withMessage('Invalid start date')
        .custom(isLastDateOfMonth).withMessage('Start date must be the last date of the month')
        .isAfter('1900-01-01').withMessage('Start date must be after 01/01/1900'),
    (0, express_validator_1.body)('end_date')
        .notEmpty().withMessage('End date is required')
        .isDate().withMessage('Invalid end date')
        .custom(isLastDateOfMonth).withMessage('End date must be the last date of the month')
        .custom((value, { req }) => isAfterStartDate(value, req.body.start_date))
        .withMessage('End date must be after start date')
        .custom(isValidDate).withMessage('Enter a valid date'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
];
