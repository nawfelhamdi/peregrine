import { Router } from "express";

import { getArchives } from "../controllers/archives/getArchives";
import { getArchiveFiles } from "../controllers/archives/getArchiveFiles";
import { getFiles } from "../controllers/archives/getFiles";
import { listGmmReports } from "../controllers/archives/listGmmReports";

import { getArchivesValidator } from "../middlewares/validators/archives/getArchives.validator";
import { getArchiveFilesValidator } from "../middlewares/validators/archives/getArchiveFiles.validator";
import { getFilesValidator } from "../middlewares/validators/archives/getFiles.validator";

const router = Router();

router.get("/archive", getArchivesValidator, getArchives);
router.get("/archive/:directoryId", getArchiveFilesValidator, getArchiveFiles);
router.get("/files", getFilesValidator, getFiles);
router.get("/gmm-reports", listGmmReports);

export default router;
