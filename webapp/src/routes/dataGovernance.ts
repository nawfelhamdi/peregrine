import { Router } from "express";

import { list } from "../controllers/dataGovernance/list";
import { profiling } from "../controllers/dataGovernance/profiling";

const router = Router();

router.get("/", list);
router.get("/profiling", profiling);

export default router;
