import { Router } from "express";

import { getPreparationPiplineLog } from "../controllers/pipelines";
import { getPreparationPiplineStepsLog } from "../controllers/pipelines";
import { getApiCallPiplineLog } from "../controllers/pipelines";
import { getApiCallPiplineStepsLog } from "../controllers/pipelines";
import { triggerPipelineApi } from "../controllers/pipelines";

import { getApiCallPiplineLogValidator } from "../middlewares/validators/pipelines/getApiCallPiplineLog.validator";
import { getApiCallPiplineStepsLogValidator } from "../middlewares/validators/pipelines/getApiCallPiplineStepsLog.validator";
import { getPreparationPiplineLogValidator } from "../middlewares/validators/pipelines/getPreparationPiplineLog.validator";
import { getPreparationPiplineStepsLogValidator } from "../middlewares/validators/pipelines/getPreparationPiplineStepsLog.validator";

const router = Router();

router.get("/preparation/:projectId", getPreparationPiplineLogValidator, getPreparationPiplineLog);
router.get("/preparation-steps/:preparationPiplineLogId", getPreparationPiplineStepsLogValidator, getPreparationPiplineStepsLog);
router.get("/apicall/:projectId", getApiCallPiplineLogValidator, getApiCallPiplineLog);
router.get("/apicall-steps/:apiCallPiplineLogId", getApiCallPiplineStepsLogValidator, getApiCallPiplineStepsLog);


router.post("/trigger-api", triggerPipelineApi);

export default router;
