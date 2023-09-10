import { Router } from "express";

import projects from "./projects";
import piplines from "./pipelines";
import archives from "./archives";
import governance from "./governance";

const checkAuth = require('../middlewares/checkAuth');
const limiter = require('../middlewares/limiter');


const router = Router();

router.use("/api/v1/projects", limiter, checkAuth, projects);
router.use("/api/v1/piplines", limiter, checkAuth, piplines);
router.use("/api/v1/archives", limiter, checkAuth, archives);
router.use("/api/v1/governance", limiter, checkAuth, governance);



export default router;
