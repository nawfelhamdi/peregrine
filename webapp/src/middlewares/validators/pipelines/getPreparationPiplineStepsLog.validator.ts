import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';

export const getPreparationPiplineStepsLogValidator = [
    param('preparationPiplineLogId')
    .notEmpty().withMessage('Data Preparation Pipeline Log ID is required')
    .isInt().withMessage('Invalid Data Preparation Pipeline Log ID'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];
