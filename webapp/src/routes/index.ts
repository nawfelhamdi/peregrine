import { Router } from "express";

import projects from "./projects";
import piplines from "./pipelines";
import archives from "./archives";
import governance from "./governance";

import checkAuth from  '../middlewares/checkAuth';
const limiter = require('../middlewares/limiter');


const router = Router();

router.use("/api/v1/projects", checkAuth, limiter, projects);
router.use("/api/v1/piplines", checkAuth, limiter, piplines);
router.use("/api/v1/archives", checkAuth, limiter, archives);
router.use("/api/v1/governance", checkAuth, limiter, governance);



export default router;
