import { Router } from "express";

import { listDiretories } from "../controllers/archives/listDiretories";
import { listFiles } from "../controllers/archives/listFiles";

const router = Router();

router.get("/", listDiretories);
router.get("/:directoryId", listFiles);

export default router;
