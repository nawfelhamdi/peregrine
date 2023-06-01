import { Router } from "express";

import projects from "./projects";
import piplines from "./pipelines";
import archives from "./archives";
import governance from "./governance";


const router = Router();

router.use("/api/v1/projects", projects);
router.use("/api/v1/piplines", piplines);
router.use("/api/v1/archives", archives);
router.use("/api/v1/governance", governance);



export default router;
