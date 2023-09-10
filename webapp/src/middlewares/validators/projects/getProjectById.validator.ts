import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';

export const getProjectByIdValidator = [
    param('projectId')
    .notEmpty().withMessage('Project ID is required')
    .isInt().withMessage('Invalid Project ID'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];
