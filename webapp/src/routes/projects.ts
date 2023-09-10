import { Router } from "express";

import { create } from "../controllers/projects/create";
import { list } from "../controllers/projects/list";
import {getProjectById } from "../controllers/projects/getProjectById";

import { createProjectValidator } from "../middlewares/validators/projects/createProject.validator";
import { getProjectByIdValidator } from "../middlewares/validators/projects/getProjectById.validator";

const router = Router();

router.post("/", createProjectValidator, create);
router.get("/", list);
router.get("/:projectId", getProjectByIdValidator, getProjectById);

export default router;
