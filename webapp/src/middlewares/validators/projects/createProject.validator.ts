import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const isLastDateOfMonth = (value: string) => {
  const date = new Date(value);
  const nextMonth = new Date(date);
  nextMonth.setMonth(date.getMonth() + 1);
  nextMonth.setDate(0);

  return date.getTime() === nextMonth.getTime();
};

const isAfterStartDate = (endDate: string, startDate: string) => {
  const dayAfter = new Date(new Date(startDate).getTime() + 86400000);
  return new Date(endDate) >= dayAfter;
};

const isValidDate = (value: string) => {
  return new Date(value) <= new Date();
};

export const createProjectValidator = [
  body('project_name').notEmpty().withMessage('Project name is required')
  .isString().withMessage('project_name must be a string')
  .custom((value) => value.trim().length !== 0).withMessage('project_name cannot be just whitespace'),

  body('measurement_model')
 .notEmpty().withMessage('Measurement model is required')
 .isIn(['PAA', 'GMM']).withMessage('Measurement model must be either "PAA" or "GMM"'),

  body('start_date')
    .notEmpty().withMessage('Start date is required')
    .isDate().withMessage('Invalid start date')
    .custom(isLastDateOfMonth).withMessage('Start date must be the last date of the month')
    .isAfter('1900-01-01').withMessage('Start date must be after 01/01/1900'),

  body('end_date')
    .notEmpty().withMessage('End date is required')
    .isDate().withMessage('Invalid end date')
    .custom(isLastDateOfMonth).withMessage('End date must be the last date of the month')
    .custom((value, { req }) => isAfterStartDate(value, req.body.start_date))
    .withMessage('End date must be after start date')
    .custom(isValidDate).withMessage('Enter a valid date'),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }
      next();
    }
];
