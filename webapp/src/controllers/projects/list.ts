import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../../config/ormconfig";
import { Project } from "../../entities/Project";
import { CustomError } from "../../utils/CustomError";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await myDataSource.getRepository(Project).find()
    res.status(200).json({ message: "List of projects", projects });
  } catch (err) {
    console.log('err')
    const customError = new CustomError(
      "Can't retrieve list of projects",
      400,
      err,
     
    );
    return next(customError);
  }
};