import { Router } from "express";

import projects from "./projects";
import piplines from "./pipelines";


const router = Router();
router.use("/api/v1/projects", projects);
router.use("/api/v1/piplines", piplines);


export default router;
