import { Router } from "express";

import { listDiretories } from "../controllers/archives/listDiretories";
import { listFiles } from "../controllers/archives/listFiles";
import { listArchiveBlobs } from "../controllers/archives/listArchiveBlobs";



const router = Router();

router.get("/", listArchiveBlobs);
router.get("/directories", listDiretories);
router.get("/directories/files/:directoryId", listFiles);

export default router;
