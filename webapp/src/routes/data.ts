import { Router } from "express";

import { list } from "../controllers/data/list";

const router = Router();

router.get("/", list);

export default router;
