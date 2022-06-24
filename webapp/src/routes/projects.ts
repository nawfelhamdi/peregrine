import { Router } from "express";

import { create } from "../controllers/projects/create";
import { list } from "../controllers/projects/list";

const router = Router();

router.post("/", create);
router.get("/", list);

export default router;
