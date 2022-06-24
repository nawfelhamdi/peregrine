import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../../config/ormconfig";
import { Step } from "../../entities/Steps";

import { CustomError } from "../../utils/CustomError";

export const getApiCallPiplineStepsLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const piplineStepsLog = await myDataSource.getRepository(Step)
    .createQueryBuilder("step")
    .where("step.pipeline_log_id = :id", { id: parseInt(req.params.apiCallPiplineLogId) })
    .getMany();
    res.status(200).json({ message: "Get preparation pipeline steps log", piplineStepsLog });
  } catch (err) {
    const customError = new CustomError(
      "Can't retrieve the api call pipeline steps log",
      400,
      err,
    );
    return next(customError);
  }
 
};

