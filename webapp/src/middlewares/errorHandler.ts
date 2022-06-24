import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'error'
    );
  }
  res.status((customError as CustomError).status).send(customError);
};

export default handleError;