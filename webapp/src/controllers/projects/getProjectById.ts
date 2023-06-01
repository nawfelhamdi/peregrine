import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../../config/ormconfig";
import { Project } from "../../entities/Project";
import { CustomError } from "../../utils/CustomError";

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await myDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .where("project.id = :id", { id: req.params.projectId })
    .orderBy('project.id', 'DESC')
    .getOne();
    res.status(200).json({ message: "find project by id", project });
  } catch (err) {
    const customError = new CustomError(
      "Can't retrieve list of projects",
      400,
      err,
     
    );
    return next(customError);
  }
};