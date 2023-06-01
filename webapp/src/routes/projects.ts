import { Router } from "express";

import { create } from "../controllers/projects/create";
import { list } from "../controllers/projects/list";
import {getProjectById } from "../controllers/projects/getProjectById";

const router = Router();

router.post("/", create);
router.get("/", list);
router.get("/:projectId", getProjectById);

export default router;
