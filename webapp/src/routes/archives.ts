import { Router } from "express";

import { getArchives } from "../controllers/archives/getArchives";
import { getArchiveFiles } from "../controllers/archives/getArchiveFiles";
import { getFiles } from "../controllers/archives/getFiles";
import { listGmmReports } from "../controllers/archives/listGmmReports";



const router = Router();

router.get("/archive", getArchives);
router.get("/archive/:directoryId", getArchiveFiles);
router.get("/files", getFiles);
router.get("/gmm-reports", listGmmReports);

export default router;
