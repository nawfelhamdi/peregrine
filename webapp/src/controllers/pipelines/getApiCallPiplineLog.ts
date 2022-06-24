import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../../config/ormconfig";
import { Pipeline } from "../../entities/Pipeline";

import { CustomError } from "../../utils/CustomError";

export const getApiCallPiplineLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const piplineLog = await myDataSource.getRepository(Pipeline)
    .createQueryBuilder("pipline")
    .where("pipline.project_id = :id", { id: req.params.projectId })
    .andWhere("pipline.pipeline_name = :pipeline_name", { pipeline_name: "Full_API_Call" })
    .orderBy('pipline.id', 'DESC')
    .getOne();

    res.status(200).json({ message: "Data_Preparation Pipline", piplineLog });
  } catch (err) {
    const customError = new CustomError(
      "Can't retrieve project pipeline",
      400,
      err,
     
    );
    return next(customError);
  }
};