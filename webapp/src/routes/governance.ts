import { Router } from "express";

import { list } from "../controllers/governance/list";
import { profiling } from "../controllers/governance/profiling";

const router = Router();

router.get("/", list);
router.get("/profiling", profiling);

export default router;
