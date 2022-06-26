import { Router } from "express";

import { list } from "../controllers/archives/list";

const router = Router();

router.get("/", list);

export default router;
