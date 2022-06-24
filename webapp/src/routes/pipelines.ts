import { Router } from "express";

import { getPreparationPiplineLog } from "../controllers/pipelines";
import { getPreparationPiplineStepsLog } from "../controllers/pipelines";
import { getApiCallPiplineLog } from "../controllers/pipelines";
import { getApiCallPiplineStepsLog } from "../controllers/pipelines";
import { triggerPipelineApi } from "../controllers/pipelines";


const router = Router();

router.get("/preparation/:projectId", getPreparationPiplineLog);
router.get("/preparation-steps/:preparationPiplineLogId", getPreparationPiplineStepsLog);
router.get("/apicall/:projectId", getApiCallPiplineLog);
router.get("/apicall-steps/:apiCallPiplineLogId", getApiCallPiplineStepsLog);

router.post("/trigger-api", triggerPipelineApi);

export default router;
