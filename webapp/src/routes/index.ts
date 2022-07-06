import { Router } from "express";

import projects from "./projects";
import piplines from "./pipelines";
import archives from "./archives";
import data from "./dataGovernance";


const router = Router();

router.use("/api/v1/projects", projects);
router.use("/api/v1/piplines", piplines);
router.use("/api/v1/archives", archives);
router.use("/api/v1/data", data);



export default router;
