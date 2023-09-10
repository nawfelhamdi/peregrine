import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';

export const getArchivesValidator = [
  query('container')
    .notEmpty().withMessage('Container is required')
    .isString().withMessage('Container must be a string')
    .isLength({ max: 30 }).withMessage('Container should not exceed 30 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Container should only contain letters and spaces')
    .custom((value) => value.trim().length !== 0).withMessage('Container cannot be just whitespace'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];
