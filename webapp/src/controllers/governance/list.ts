import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../../config/ormconfig";
import { Data } from "../../entities/Data";
import { CustomError } from "../../utils/CustomError";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await myDataSource.getRepository(Data).find()
    res.status(200).json({ message: "List of data healh check", result });
  } catch (err) {

    const customError = new CustomError(
      "Can't retrieve list of data healh check",
      400,
      err,
     
    );
    return next(customError);
  }
};